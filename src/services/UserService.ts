import { IUserResponseDTO} from "@/domain/entities/User/dto/IUserDTO";
import { IUserService } from "@/domain/entities/User/IUserService";
import { IpcChannel , Autowired } from "@/utils/decorators";
import { User } from "@/domain/entities/User/User";
import { database } from "@/infra/database";
import { EncryptionService } from "./EncryptionService";
import { Worker } from "@/domain/entities/Worker/Worker";
import { userRepository } from "@/infra/repositories";


export class UserService implements IUserService{

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @IpcChannel()
  async getAllUsers(): Promise<IUserResponseDTO[]>{
    const users = await userRepository.find()
    return users
  }

  @IpcChannel()
  async getUserById(id: number): Promise<IUserResponseDTO> {
    try{
      const user = await userRepository.findOneBy({id})
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
