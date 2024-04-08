import { IEntityRepository } from "@/domain/interfaces/IEntityRepository";
import { User } from "@/domain/entities/User/User";

export type IUserRepository = IEntityRepository<User>
