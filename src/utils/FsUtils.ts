import fs, { readFileSync } from 'fs'
import path from 'path'
import {watch} from 'chokidar'


export class FsUtils {

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

  readFile(filename: string){
    console.log(path.join(this.directory, filename))
    if(!fs.existsSync(path.join(this.directory, filename))){
      throw new Error("File is not found!")
    }
    return fs.readFileSync(path.join(this.directory, filename)).toString()
  }

  writeFile(filename: string){
    return fs.writeFileSync(path.join(this.directory, filename), 'teste')
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
