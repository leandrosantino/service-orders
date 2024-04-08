import { IServiceOrderRepository } from "@/domain/entities/ServiceOrder/IServiceOrderRepository";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";

export class ServiceOrderRepository implements IServiceOrderRepository{

  repository: Repository<ServiceOrder>

  constructor() {
    this.repository = database.getRepository(ServiceOrder)
  }

  create(entity: ServiceOrder): Promise<ServiceOrder> {
    return this.repository.save(entity)
  }

  find(options?: FindManyOptions<ServiceOrder>): Promise<ServiceOrder[]> {
    return this.repository.find(options)
  }

  findOneBy(options: FindOptionsWhere<ServiceOrder>): Promise<ServiceOrder> {
    return this.repository.findOneBy(options)
  }

}
