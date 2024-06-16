import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm"

export interface IEntityRepository<T> {
  create(entity:T): Promise<T>
  find(options?: FindManyOptions<T>): Promise<T[]>
  findOneBy(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T>
  findOne(options: FindOneOptions<T>): Promise<T>
}


