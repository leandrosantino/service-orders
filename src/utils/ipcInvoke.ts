import { IServiceKeys } from "@/domain/interfaces/IServicesKeys"
import { ipcRenderer } from "electron"

export async function ipcInvoke <R, T=void>(path: IServiceKeys, args?: T): Promise<R>{
  return await ipcRenderer.invoke(path, args)
}

