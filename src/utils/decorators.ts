import { ipcMain } from "electron"

export function Autowired(Constructor: {new (...args: unknown[]): object }){
  return <T>(target: T, key: keyof T)  => {
    const obj = new Constructor()
    target[key] = obj as never;
  }
}

function defineIpcHandle(target: object, key: string, descriptor: PropertyDescriptor){
  if (!ipcMain) return;
  ipcMain.handle(key, async (_, ...args)=>{
    return await descriptor.value.apply(target, args)
  })
}

export function IpcEvent (){
  return (target: object, key: string, descriptor: PropertyDescriptor) => {
    if (!ipcMain) return;
    ipcMain.on(key, (ev, args) => {
      descriptor.value.apply(target, [ev, ...args?args:[]])
    })
  }
}

export function IpcChannel (){
  return defineIpcHandle
}

export function IpcQuery (){
  return defineIpcHandle
}

export function IpcMutation (){
  return defineIpcHandle
}
