import { FindManyOptions, FindOneOptions, FindOperator, FindOptionsUtils, FindOptionsWhere, Repository, UpdateResult, } from "typeorm";
import { database } from "../database";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";


export class PrintedPreventiveServiceOrderRepository{

  private repository: Repository<PrintedPreventiveServiceOrder>

  update: Repository<PrintedPreventiveServiceOrder>['update']

  constructor() {
    this.repository = database.getRepository(PrintedPreventiveServiceOrder)
    this.update = this.repository.update
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

  existsBy(options: FindOptionsWhere<PrintedPreventiveServiceOrder> | FindOptionsWhere<PrintedPreventiveServiceOrder>[]): Promise<boolean>{
    return this.repository.existsBy(options)
  }


}
