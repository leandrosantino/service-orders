import { contextBridge } from 'electron';
import { ipcInvoke } from '@/utils/ipcInvoke';

const preloadMethods = {
  invoke: ipcInvoke
}

export type PreloadMethods = typeof preloadMethods

contextBridge.exposeInMainWorld('app', preloadMethods);
