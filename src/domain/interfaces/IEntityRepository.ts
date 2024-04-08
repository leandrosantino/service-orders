import { FindManyOptions, FindOptionsWhere } from "typeorm"

export interface IEntityRepository<T> {
  create(entity:T): Promise<T>
  find(options?: FindManyOptions<T>): Promise<T[]>
  findOneBy(options: FindOptionsWhere<T>): Promise<T>
}


