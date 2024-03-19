import { UserRole } from "./UserRoules"

export interface IUserDTO {
  firstName: string
  lastName: string
  register: number
  password: string
  roule: UserRole
}
