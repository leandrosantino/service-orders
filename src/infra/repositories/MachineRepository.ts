import { IMachineRepository } from "@/domain/entities/Machine/IMachineRepository";
import { Machine } from "@/domain/entities/Machine/Machine";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";

export class MachineRepository {

  private repository: Repository<Machine>

  constructor (){
    this.repository = database.getRepository(Machine)
  }

  create(entity: Machine): Promise<Machine> {
    return this.repository.save(entity)
  }
  find(options?: FindManyOptions<Machine>): Promise<Machine[]> {
    return this.repository.find(options)
  }
  findOneBy(options: FindOptionsWhere<Machine>): Promise<Machine> {
    return this.repository.findOneBy(options)
  }

}
