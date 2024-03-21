import { IUserRequestDTO , IUserResponseDTO} from "@/domain/User/dto/IUserDTO";
import { IUserService } from "@/domain/User/IUserService";
import { userRepository } from "@/domain/User/UserRepository";
import { IpcChannel , Autowired } from "@/utils/decorators";
import { User } from "@/domain/User/User";
import { database } from "@/infra/database";
import { EncryptionService } from "./EncryptionService";


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
