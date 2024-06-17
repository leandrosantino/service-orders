import { IUserRequestDTO , IUserResponseDTO} from "@/domain/entities/User/dto/IUserDTO";
import { IUserService } from "@/domain/entities/User/IUserService";
import { UserRepository } from "@/infra/repositories/UserRepository";
import { IpcChannel , Autowired } from "@/utils/decorators";
import { User } from "@/domain/entities/User/User";
import { database } from "@/infra/database";
import { EncryptionService } from "./EncryptionService";
import { WorkerRepostory } from "@/infra/repositories/WorkerRepostory";
import { Worker } from "@/domain/entities/Worker/Worker";


export class UserService implements IUserService{

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @Autowired(UserRepository)
  userRepository: UserRepository

  @Autowired(WorkerRepostory)
  workerRepository: WorkerRepostory

  @IpcChannel()
  async getAllUsers(): Promise<IUserResponseDTO[]>{
    const users = await this.userRepository.find()
    return users
  }

  @IpcChannel()
  async getUserById(id: number): Promise<IUserResponseDTO> {
    try{
      const user = await this.userRepository.findOneBy({id})
      return user
    }catch{
      return null
    }
  }

  @IpcChannel()
  async create(user: User): Promise<User> {
    const encryptedPassword = this.encryptionService.generate(user.password)
    user.setPassword(encryptedPassword)
    return await database.manager.save(user)
  }

  async createWorker(worker: Worker): Promise<void> {
    await database.manager.save(worker)
  }

}
