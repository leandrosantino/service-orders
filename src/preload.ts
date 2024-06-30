import { contextBridge } from 'electron';
import { invokeMethods } from '@/infra/ipcInvoke'

const preloadMethods = {
  invoke: invokeMethods
}

export type PreloadMethods = typeof preloadMethods

contextBridge.exposeInMainWorld('app', preloadMethods);
