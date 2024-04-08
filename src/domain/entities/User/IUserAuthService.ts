import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { IUserAuthRequestDTO } from "@/domain/entities/User/dto/IUserAuthDTO";
import { IUserResponseDTO } from "@/domain/entities/User/dto/IUserDTO";

export interface IUserAuthService {
  auth(credentias: IUserAuthRequestDTO):Promise<IResponseEntity<IUserResponseDTO>>
}
