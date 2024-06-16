import { IPreventiveActionRepository } from "@/domain/entities/PreventiveAction/IPreventiveActionRepository";
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { database } from "../database";

export class PreventiveActionRepository {

  private repository: Repository<PreventiveAction>

  constructor() {
    this.repository = database.getRepository(PreventiveAction)
  }

  findOne(options: FindOneOptions<PreventiveAction>): Promise<PreventiveAction> {
    return this.repository.findOne(options)
  }

  create(entity: PreventiveAction): Promise<PreventiveAction> {
    return this.repository.save(entity)
  }
  find(options?: FindManyOptions<PreventiveAction>): Promise<PreventiveAction[]> {
    return this.repository.find(options)
  }
  findOneBy(options: FindOptionsWhere<PreventiveAction>): Promise<PreventiveAction> {
    return this.repository.findOneBy(options)
  }

}
