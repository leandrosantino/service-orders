import { ipcMain } from "electron"

export function Autowired(Constructor: {new (...args: unknown[]): object }){
  return <T>(target: T, key: keyof T)  => {
    const obj = new Constructor()
    target[key] = obj as never;
  }
}

export function IpcChannel (){
  return (target: object, key: string, descriptor: PropertyDescriptor) => {
    ipcMain.handle(key, async (_, args)=>{
      return await descriptor.value.apply(target, args)
    })
  }
}
