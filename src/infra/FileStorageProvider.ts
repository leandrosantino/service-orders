import fs, { readFileSync } from 'fs'
// import path from 'path'
import {watch} from 'chokidar'

export class FileStorageProvider {

  constructor(
    private readonly directory: string
  ){}

  listFiles() {
    const files = fs
      .readdirSync(this.directory, {withFileTypes: true, })
      .filter((file) => file.isFile())
      .map(file => file.name)
    return files
  }



  listeningDir(){
    watch(this.directory, {
      ignoreInitial: true,
    })
      .on('change', (filename) => {
        const data = readFileSync(filename).toString()
        console.log(filename, ' - ', data)
      })
      .on('add', (filename) => {
        const data = readFileSync(filename).toString()
        console.log('create new file - ', filename, ' - ', data)
      })
  }

}
