import { IPrintService } from "@/domain/interfaces/IPrintService";
import { Dialog } from "@/utils/Dialog";
import { IpcEvent } from "@/utils/decorators";
import { BrowserWindow } from "electron";
import path from 'path'
import fs from 'fs'

export class PrintService implements IPrintService{

  async print (window: BrowserWindow) {
    return await new Promise<void>((resolve, reject) => {
      const dialog = new Dialog(window)
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
    const dialog = new Dialog(window)
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
