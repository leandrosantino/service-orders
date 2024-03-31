import { ipcMain, ipcRenderer } from "electron"

function IpcChannel() {
  return (_: object, key: string, descriptor: PropertyDescriptor) => {
    ipcMain.on(key, (event, args) => {
      event.reply(key + ':reply', descriptor.value(...args))
    })
  }
}

class Teste {

  @IpcChannel()
  getItems() {
    return 'leandro santino'.toLocaleUpperCase()
  }

}

const a = new Teste()

a.getItems()
console.log(a)

function fetch<R, T>(channel: string, args: T): Promise<R> {
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.send('channel', args)
      ipcRenderer.on(channel + ':reply', (event, a: R) => { resolve(a) })
    } catch {
      reject()
    }
  })
}

(async () => {
  const a = await fetch<number, { a: string }>('getItems', { a: '' })
  console.log(a)
})()

