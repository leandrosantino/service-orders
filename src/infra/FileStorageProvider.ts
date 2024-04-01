import fs, { readFileSync } from 'fs'
import path from 'path'

export class FileStorageProvider {

  constructor(
    private readonly directory: string
  ){}

  listFiles() {
    const files = fs
      .readdirSync(this.directory, {withFileTypes: true})
      .filter((file) => file.isFile())
      .map(file => file.name)
    return files
  }



  listeningDir(){
    fs.watch(this.directory, {persistent: true}, (a, b) => {
      const data = readFileSync(path.join(this.directory, b)).toString()

      console.log(a, ' - ', data)
    })
  }

}
