import { IUserResponseDTO} from "@/domain/entities/User/dto/IUserDTO";
import { IUserService } from "@/domain/entities/User/IUserService";
import { Autowired, IpcQuery, IpcMutation } from "@/utils/decorators";
import { User } from "@/domain/entities/User/User";
import { database } from "@/infra/database";
import { EncryptionTool } from "@/tools/EncryptionTool";
import { Worker } from "@/domain/entities/Worker/Worker";
import { userRepository } from "@/infra/repositories";


export class UserService implements IUserService{

  @Autowired(EncryptionTool)
  encryptionTool: EncryptionTool

  @IpcQuery()
  async getAllUsers(): Promise<IUserResponseDTO[]>{
    const users = await userRepository.find()
    return users
  }

  @IpcQuery()
  async getUserById(id: number): Promise<IUserResponseDTO> {
    try{
      const user = await userRepository.findOneBy({id})
      return user
    }catch{
      return null
    }
  }

  @IpcMutation()
  async create(user: User): Promise<User> {
    const encryptedPassword = this.encryptionTool.generate(user.password)
    user.setPassword(encryptedPassword)
    return await database.manager.save(user)
  }

  async createWorker(worker: Worker): Promise<void> {
    await database.manager.save(worker)
  }

}
