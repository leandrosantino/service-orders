import { Autowired, IpcChannel } from "@/utils/decorators";

import { EncryptionService } from "@/services/EncryptionService";
import { User } from "@/domain/entities/User/User";

import { IUserAuthRequestDTO } from "@/domain/entities/User/dto/IUserAuthDTO";
import { IUserResponseDTO } from "@/domain/entities/User/dto/IUserDTO";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { IUserAuthService } from "@/domain/entities/User/IUserAuthService";
import { userRepository } from "@/infra/repositories";
import { ResponseEntity } from "@/infra/ResponseEntity";

export class AuthService implements IUserAuthService{

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  @IpcChannel()
  async auth({password, register} : IUserAuthRequestDTO): Promise<IResponseEntity<IUserResponseDTO>>{
    let user: User | null = null

    const response = new ResponseEntity<User>()

    user = await userRepository.findOneBy({
      register
    })

    if(!user){
      return response.falure('registration not found')
    }

    if(!this.encryptionService.verify(password, user.password)){
      return response.falure('invalid password')
    }

    return response.success(user)

  }

}
