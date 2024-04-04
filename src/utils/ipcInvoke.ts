import { IpcChannelKeys } from "test"
import { ipcRenderer } from "electron"

export async function ipcInvoke <R, T=void>(path: IpcChannelKeys, args?: T): Promise<R>{
  return await ipcRenderer.invoke(path, args)
}



