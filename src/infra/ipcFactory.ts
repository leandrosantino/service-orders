import { UserController } from "@/controllers/UserController";

export function ipcFactory(){
  return [
    new UserController()
  ]
}

export type IpcChannelKeys = keyof UserController
