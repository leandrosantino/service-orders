import { FileStorageProvider } from "./infra/FileStorageProvider";
import path from 'path'
import { DateTime } from "./utils/DateToos";
import { serviceOrderRepository } from "./domain/ServiceOrder/ServiceOrderRepository";
import { database } from "./infra/database";
import { ServiceOrder } from "./domain/ServiceOrder/ServiceOrder";
import { WorkerSpecialtys } from "./domain/Worker/WorkerSpecialtys";

const FILE_NAME_PATTERN = /^OS_\d+_\d+_\d+.json$/

const fileStorage = new FileStorageProvider(path.join(__dirname, '../data'))

const os = fileStorage.listFiles()
  .filter( file => FILE_NAME_PATTERN.test(file))
  .map(file => {
    const [ id, createdAt, updatedAt ] = file.replace(/^OS_|\.json$/g, '').split('_')
    return {
      id: Number(id),
      createdAt: new DateTime().fromDateNumber(Number(createdAt)),
      updatedAt: new DateTime().fromDateNumber(Number(updatedAt))
      ,
    }
  })

;(async () => {
  await database.initialize()

  const so = new ServiceOrder()
    .setConcluded(false)
    .setDate(new DateTime())
    .setDurationInMinutes(12)
    .setSpecialty(WorkerSpecialtys.MECHANICS)
    .setWeekCode(new DateTime().toWeekOfYearString())

  serviceOrderRepository.save(so)

  for (const item of os){
    try {
      const serviceOrder = await serviceOrderRepository.findOneBy({
        id: item.id
      })

      if(item.updatedAt.isBefore(serviceOrder.updatedAt)){
        console.log(`database is more recent, item: ${item.updatedAt.toDateString()} database: ${serviceOrder.updatedAt.toDateString()}`)
        continue
      }

      if(item.updatedAt.isAfter(serviceOrder.updatedAt)){
        console.log(`file is more recent, item: ${item.updatedAt.toDateString()} database: ${serviceOrder.updatedAt.toDateString()}`)
        continue
      }

    } catch {
      continue
    }
  }
})()
