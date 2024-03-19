import { contextBridge } from 'electron';
import { IpcUtils } from './utils/IpcUtils';

const preloadMethods = {
  invoke: IpcUtils.invoke
}

export type PreloadMethods = typeof preloadMethods

contextBridge.exposeInMainWorld('app', preloadMethods);
