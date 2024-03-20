import { IUserResponseDTO } from "@/domain/User/dto/IUserDTO";
import { EncryptionService } from "./EncryptionService";
import { Autowired } from "@/utils/decorators";

export class AuthService {

  @Autowired(EncryptionService)
  encryptionService: EncryptionService

  async auth(): Promise<IUserResponseDTO>{
    return
  }

}
