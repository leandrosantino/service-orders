import { contextBridge } from 'electron';
import { ipcInvoke } from '@/infra/ipcInvoke'

const preloadMethods = {
  invoke: ipcInvoke
}

export type PreloadMethods = typeof preloadMethods

contextBridge.exposeInMainWorld('app', preloadMethods);
