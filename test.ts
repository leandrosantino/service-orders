import { FileStorageProvider } from "./src/infra/FileStorageProvider";
import path from 'path'

const fileStorage = new FileStorageProvider(path.join(__dirname, './data'))

fileStorage.listFiles().forEach(file => {
  const regex = /^OS_\d+_\d{2}-\d{2}-\d{4}_(OPEN|CLOSE)_\d+_\d+\.json$/
  if(!regex.test(file)){
    console.log("invalid filename format!")
    return
  }
  const filename = file
    .replace(/^OS_|\.json$/g, '')
    .replaceAll('-', '/')
    .split('_')
  console.log(filename)
})
fileStorage.listeningDir()
