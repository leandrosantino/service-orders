import { IPreventiveServiceOrderRepository } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderRepository";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";

export class PreventiveServiceOrderRepository{

  private repository: Repository<PreventiveServiceOrder>

  constructor() {
    this.repository = database.getRepository(PreventiveServiceOrder)
  }

  findOne(options: FindOneOptions<PreventiveServiceOrder>): Promise<PreventiveServiceOrder> {
    return this.repository.findOne(options)
  }

  create(entity: PreventiveServiceOrder): Promise<PreventiveServiceOrder> {
    return this.repository.save(entity)
  }
  find(options?: FindManyOptions<PreventiveServiceOrder>): Promise<PreventiveServiceOrder[]> {
    return this.repository.find(options)
  }
  findOneBy(options: FindOptionsWhere<PreventiveServiceOrder>): Promise<PreventiveServiceOrder> {
    return this.repository.findOneBy(options)
  }

}
