import { IUserResponseDTO } from "@/domain/User/dto/IUserDTO";
import { EncryptionService } from "./EncryptionService";
import { Autowired, IpcChannel } from "@/utils/decorators";
import { userRepository } from "@/domain/User/UserRepository";
import { IUserAuthRequestDTO } from "@/domain/User/dto/IUserAuthDTO";
import { User } from "@/domain/User/User";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";

export class AuthService {

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @IpcChannel()
  async auth({password, register} : IUserAuthRequestDTO): Promise<IResponseEntity<IUserResponseDTO>>{
    let user: User | null = null

    user = await userRepository.findOneBy({
      register
    })

    if(!user){
      return {
        error: true,
        message: 'registration not found'
      }
    }

    if(!this.encryptionService.verify(password, user.password)){
      return {
        error: true,
        message: 'invalid password'
      }
    }

    return {
      error: false,
      data: user
    }

  }

}
