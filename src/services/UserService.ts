import { IUserRequestDTO , IUserResponseDTO} from "@/domain/entities/User/dto/IUserDTO";
import { IUserService } from "@/domain/entities/User/IUserService";
import { UserRepository } from "@/infra/repositories/UserRepository";
import { IpcChannel , Autowired } from "@/utils/decorators";
import { User } from "@/domain/entities/User/User";
import { database } from "@/infra/database";
import { EncryptionService } from "./EncryptionService";
import { IUserRepository } from "@/domain/entities/User/IUserRepository";


export class UserService implements IUserService{

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @Autowired(UserRepository)
  userRepository: IUserRepository

  @IpcChannel()
  async getAllUsers(): Promise<IUserResponseDTO[]>{
    const users = await this.userRepository.find()
    return users
  }

  @IpcChannel()
  async getUserById(id: string): Promise<IUserResponseDTO> {
    try{
      const user = await this.userRepository.findOneBy({id})
      return user
    }catch{
      return null
    }
  }

  @IpcChannel()
  async create(data: IUserRequestDTO): Promise<IUserResponseDTO> {

    const encryptedPassword = this.encryptionService.generate(data.password)

    const user = new User()
      .setFirstName(data.firstName)
      .setLastName(data.lastName)
      .setRegister(data.register)
      .setPassword(encryptedPassword)
      .setRoule(data.roule)

    await database.manager.save(user)
    return user
  }


}
