import { contextBridge } from 'electron';
import { invokeMethods } from '@/infra/ipcInvoke'
import { ipcRenderer } from "electron"

const preloadMethods = {
  invoke: invokeMethods,
  ipc: ipcRenderer.invoke
}

export type PreloadMethods = typeof preloadMethods

contextBridge.exposeInMainWorld('app', preloadMethods);
