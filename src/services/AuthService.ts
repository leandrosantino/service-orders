import { IUserResponseDTO } from "@/domain/entities/User/dto/IUserDTO";
import { EncryptionService } from "./EncryptionService";
import { Autowired, IpcChannel } from "@/utils/decorators";
import { UserRepository } from "@/infra/repositories/UserRepository";
import { IUserAuthRequestDTO } from "@/domain/entities/User/dto/IUserAuthDTO";
import { User } from "@/domain/entities/User/User";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { IUserRepository } from "@/domain/entities/User/IUserRepository";

export class AuthService {

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @Autowired(UserRepository)
  userRepository: IUserRepository

  @IpcChannel()
  async auth({password, register} : IUserAuthRequestDTO): Promise<IResponseEntity<IUserResponseDTO>>{
    let user: User | null = null

    user = await this.userRepository.findOneBy({
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
