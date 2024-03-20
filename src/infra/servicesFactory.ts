import { UserService } from "@/services/UserService";

export function servicesFactory(){
  return {userService: new UserService()}
}

export type IpcChannelKeys = keyof UserService
