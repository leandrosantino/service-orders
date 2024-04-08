import { FsUtils } from "./src/utils/FsUtils";
import path from 'path'

// ;(async () => {

//   const fileStorage = new FsUtils(path.join(__dirname, '../data'))
//   const os = fileStorage.listFiles()
//     .filter( file => FILE_NAME_PATTERN.test(file))
//     .map(file => {
//       const [ id, createdAt, updatedAt ] = file.replace(/^OS_|\.json$/g, '').split('_')
//       return {
//         id: Number(id),
//         createdAt: new DateTime().fromDateNumber(Number(createdAt)),
//         updatedAt: new DateTime().fromDateNumber(Number(updatedAt)),
//         filename: file
//       }
//     })

//   for (const item of os){
//     try {
//       const serviceOrder = await serviceOrderRepository.findOneBy({
//         id: item.id
//       })
//       console.log(`
//         item: ${item.updatedAt.toLocaleString()}
//         database: ${serviceOrder.updatedAt.toLocaleString()}
//       `)

//       console.log()

//       if(item.updatedAt.isBefore(serviceOrder.updatedAt)){
//         console.log(`database is more recent`)
//         continue
//       }

//       if(item.updatedAt.isAfter(serviceOrder.updatedAt)){
//         console.log(`file is more recent`)
//         continue
//       }

//     } catch {
//       continue
//     }
//   }
// });

// (async () => {
//   database.initialize()
//   const user = await userRepository.find()
//   console.log(user)
// })();

const fileStorage = new FsUtils(path.join(__dirname, 'data'))

console.log(fileStorage.readFile('OS_1_1712165666323_1712165060632.json'))
fileStorage.writeFile('OS_1_1712165666323_1712165060632.json')

/*

import { IServiceOrderRepository } from "@/domain/entities/ServiceOrder/IServiceOrderRepository";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { FsUtils } from "@/utils/FsUtils";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";
import { DateTime } from "@/utils/DateUtils";
import { z } from "zod";
import { WorkerSpecialtys } from "@/domain/entities/Worker/WorkerSpecialtys";

export class ServiceOrderRepository implements IServiceOrderRepository{

  FILE_NAME_PATTERN = /^OS_\d+_\d+_\d+.json$/
  repository: Repository<ServiceOrder>
  fs: FsUtils

  filesDataSchema = z.object({
    id: z.number(),
    weekCode: z.string(),
    date: z.date(),
    durationInMinutes: z.number(),
    concluded: z.boolean(),
    specialty: z.string(),
    machineId: z.string(),
    responsible: z.string().array()
  })

  constructor() {
    this.repository = database.getRepository(ServiceOrder)
    this.fs = new FsUtils('D:\\dev\\service-orders\\data')
    this.synchronization()
  }

  private async synchronization(){
    const dataFiles = this.getDataFiles()
    for (const item of dataFiles){
      const serviceOrder = await this.repository.findOneBy({
        id: item.id
      })

      console.log(`
        item: ${item.updatedAt.toLocaleString()}
        database: ${serviceOrder.updatedAt.toLocaleString()}
      `)

      if(serviceOrder === null){
        continue
      }

      if(item.updatedAt.isBefore(serviceOrder.updatedAt)){
        console.log(`database is more recent`)
        continue
      }

      if(item.updatedAt.isAfter(serviceOrder.updatedAt)){
        console.log(`file is more recent`)
        continue
      }

    }
  }

  // updateDatabaseWithFileData(filename: string){

  //   const updatedServiceOrder = this.fileDataToEntity(filename)

  //   this.repository.update(fileData.id, updatedServiceOrder)

  // }
  // updateFileWithDatabase(){}

  fileDataToEntity(filename:string){
    try{
      const fileData = this.filesDataSchema.parse(
        JSON.parse(this.fs.readFile(filename))
      )
      const entity = new ServiceOrder()
        .setConcluded(fileData.concluded)
        .setDate(fileData.date)
        .setDurationInMinutes(fileData.durationInMinutes)
        .setSpecialty(fileData.specialty as WorkerSpecialtys)
        .setWeekCode(fileData.weekCode)

      return entity
    }catch{
      return null
    }
  }

  private getDataFiles(){
    return this.fs.listFiles()
      .filter( file => this.FILE_NAME_PATTERN.test(file))
      .map(file => {
        const [ id, createdAt, updatedAt ] = file.replace(/^OS_|\.json$/g, '').split('_')

        return {
          id: Number(id),
          createdAt: new DateTime().fromDateNumber(Number(createdAt)),
          updatedAt: new DateTime().fromDateNumber(Number(updatedAt)),
          filename: file
        }
      })
  }



  find(options?: FindManyOptions<ServiceOrder>): Promise<ServiceOrder[]> {
    return this.repository.find(options)
  }

  findOneBy(options: FindOptionsWhere<ServiceOrder>): Promise<ServiceOrder> {
    return this.repository.findOneBy(options)
  }

}


*/
