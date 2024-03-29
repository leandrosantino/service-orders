import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";

export function servicesFactory(){
  return {
    userService: new UserService(),
    authService: new AuthService()
  }
}

export type IpcChannelKeys = keyof UserService | keyof AuthService
