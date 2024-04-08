import { User } from "@/domain/entities/User/User";
import { IUserRequestDTO, IUserResponseDTO } from "@/domain/entities/User/dto/IUserDTO";

export interface IUserService {
  getAllUsers(): Promise<IUserResponseDTO[]>
  getUserById(id: User['id']): Promise<IUserResponseDTO>
  create(data: IUserRequestDTO): Promise<IUserResponseDTO>
}
