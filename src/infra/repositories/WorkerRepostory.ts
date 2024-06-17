import { Worker } from "@/domain/entities/Worker/Worker";
import { database } from "../database";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

export class WorkerRepostory{

  private repository: Repository<Worker>

  constructor (){
    this.repository = database.getRepository(Worker)
  }

  create(entity: Worker): Promise<Worker> {
    return this.repository.save(entity)
  }

  find(options?: FindManyOptions<Worker>): Promise<Worker[]> {
    return this.repository.find(options)
  }

  findOneBy(options: FindOptionsWhere<Worker>): Promise<Worker> {
    return this.repository.findOneBy(options)
  }

}
