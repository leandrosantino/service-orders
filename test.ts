import { FsUtils } from "./src/utils/FsUtils";
import path from 'path'
import { DateTime } from "./src/utils/DateUtils";
import { serviceOrderRepository } from "./src/domain/entities/ServiceOrder/ServiceOrderRepository";
import console from "console";
import { database } from "./src/infra/database";
import { userRepository } from "./src/infra/repositories/UserRepository";

const FILE_NAME_PATTERN = /^OS_\d+_\d+_\d+.json$/

;(async () => {

  const fileStorage = new FsUtils(path.join(__dirname, '../data'))
  const os = fileStorage.listFiles()
    .filter( file => FILE_NAME_PATTERN.test(file))
    .map(file => {
      const [ id, createdAt, updatedAt ] = file.replace(/^OS_|\.json$/g, '').split('_')
      return {
        id: Number(id),
        createdAt: new DateTime().fromDateNumber(Number(createdAt)),
        updatedAt: new DateTime().fromDateNumber(Number(updatedAt)),
        filename: file
      }
    })

  for (const item of os){
    try {
      const serviceOrder = await serviceOrderRepository.findOneBy({
        id: item.id
      })
      console.log(`
        item: ${item.updatedAt.toLocaleString()}
        database: ${serviceOrder.updatedAt.toLocaleString()}
      `)

      console.log()

      if(item.updatedAt.isBefore(serviceOrder.updatedAt)){
        console.log(`database is more recent`)
        continue
      }

      if(item.updatedAt.isAfter(serviceOrder.updatedAt)){
        console.log(`file is more recent`)
        continue
      }

    } catch {
      continue
    }
  }
});

(async () => {
  database.initialize()
  const user = await userRepository.find()
  console.log(user)
})();
