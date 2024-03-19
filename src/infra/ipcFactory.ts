import { UserController } from "@/controllers/UserController";

export function ipcFactory(){
  new UserController()
}

export type IpcChannelKeys = keyof UserController
