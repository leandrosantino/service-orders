import { UserRole } from "../UserRoules"

export type IUserRequestDTO = Omit<IUserResponseDTO, 'id'>

export interface IUserResponseDTO {
  id: number
  firstName: string
  lastName: string
  register: number
  password: string
  roule: UserRole
}
