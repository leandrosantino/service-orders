import { User } from "@/domain/entities/User/User";
import { database } from "../database";
import { IUserRepository } from "@/domain/entities/User/IUserRepository";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

export class UserRepository implements IUserRepository {

  private repository: Repository<User>

  constructor (){
    this.repository = database.getRepository(User)
  }

  create(entity: User): Promise<User> {
    return this.repository.save(entity)
  }

  find(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(options)
  }

  findOneBy(options: FindOptionsWhere<User>): Promise<User> {
    return this.repository.findOneBy(options)
  }

}
