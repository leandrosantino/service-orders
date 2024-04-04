import { User } from "@/domain/entities/User/User";
import { database } from "../database";
import { IUserRepository } from "@/domain/entities/User/IUserRepository";
import { FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

export class UserRepository implements IUserRepository {

  repository: Repository<User>

  constructor (){
    this.repository = database.getRepository(User)
  }

  find(options?: FindManyOptions<User>): Promise<User[]> {
    return this.repository.find(options)
  }

  findOneBy(options: FindOptionsWhere<User>): Promise<User> {
    return this.repository.findOneBy(options)
  }

}
