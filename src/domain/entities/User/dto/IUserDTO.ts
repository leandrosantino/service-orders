import { UserRole } from "@/domain/entities/User/UserRoules"

export type IUserRequestDTO = Omit<IUserResponseDTO, 'id'>

export interface IUserResponseDTO {
  id: string
  firstName: string
  lastName: string
  register: number
  password: string
  roule: UserRole
}
