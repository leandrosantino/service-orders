import { IpcChannelKeys } from "@/infra/ipcFactory"
import { ipcMain, ipcRenderer } from "electron"

export class IpcUtils {

  static ipcChannelDecorator(){
    return (_: object, key: string, descriptor: PropertyDescriptor) => {
      ipcMain.handle(key, async (_, args)=>{
        return await descriptor.value(args)
      })
    }
  }

  static async invoke<R, T>(path: IpcChannelKeys, args?: T): Promise<R>{
    return await ipcRenderer.invoke(path, args)
  }

}


export const IpcChannel = IpcUtils.ipcChannelDecorator
