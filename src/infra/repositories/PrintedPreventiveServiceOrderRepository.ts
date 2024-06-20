import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";

export class PrintedPreventiveServiceOrderRepository{

  private repository: Repository<PrintedPreventiveServiceOrder>

  constructor() {
    this.repository = database.getRepository(PrintedPreventiveServiceOrder)
  }

  findOne(options: FindOneOptions<PrintedPreventiveServiceOrder>): Promise<PrintedPreventiveServiceOrder> {
    return this.repository.findOne(options)
  }

  create(entity: PrintedPreventiveServiceOrder): Promise<PrintedPreventiveServiceOrder> {
    return this.repository.save(entity)
  }
  find(options?: FindManyOptions<PrintedPreventiveServiceOrder>): Promise<PrintedPreventiveServiceOrder[]> {
    return this.repository.find(options)
  }
  findOneBy(options: FindOptionsWhere<PrintedPreventiveServiceOrder>): Promise<PrintedPreventiveServiceOrder> {
    return this.repository.findOneBy(options)
  }

}