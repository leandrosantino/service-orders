import { DialogTool } from "@/tools/DialogTools";
import { BrowserWindow } from "electron";
import path from 'path'
import fs from 'fs'

export class PrintTool {

  async print (window: BrowserWindow) {
    return await new Promise<void>((resolve, reject) => {
      const dialog = new DialogTool(window)
      window?.webContents.print({
          pageSize: 'A4',
          margins: {
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
          }
      }, (success, message) => {
          if(!success) {
            reject(message)
            dialog.error(message)
            return
          }
          resolve()
          dialog.success('Sucesso!!', 'A Ordem de Serviço foi Impressa!!')
      })
    })
  };

  async printToPdf (window: BrowserWindow, fileName:string) {
    const dialog = new DialogTool(window)
    const pdfpath = dialog.openFile('Escolha a pasta para salvar o PDF', 'Salvar Ordem de Serviço Preventiva')
    if (pdfpath) {
      try{
        const pdf = await window?.webContents.printToPDF({
          pageSize: 'A4',
        })
        if (pdf) fs.writeFileSync(path.join(pdfpath[0], `${fileName}.pdf`), pdf, 'binary')
        dialog.success('Sucesso!!', 'A Ordem de Serviço foi Salva!!')
      }catch(err){
        dialog.error((err as Error).message)
      }
    }
  }

}
