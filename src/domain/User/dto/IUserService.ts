import { User } from "../User";
import { IUserRequestDTO, IUserResponseDTO } from "./IUserDTO";

export interface IUserService {
  getAllUsers(): Promise<IUserResponseDTO[]>
  getUserById(id: User['id']): Promise<IUserResponseDTO>
  create(data: IUserRequestDTO): Promise<IUserResponseDTO>
}
