import { FindManyOptions, FindOptionsWhere } from "typeorm"

export interface IEntityRepository<T> {
  find(options?: FindManyOptions<T>): Promise<T[]>
  findOneBy(options: FindOptionsWhere<T>): Promise<T>
}


