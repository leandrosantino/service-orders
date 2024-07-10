import { IPrintService } from "@/domain/interfaces/IPrintService";
import { Dialog } from "@/utils/Dialog";
import { IpcEvent } from "@/utils/decorators";
import { BrowserWindow } from "electron";
import path from 'path'
import fs from 'fs'

export class PrintService implements IPrintService{

  @IpcEvent()
  print (event: Electron.IpcMainEvent, args?: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender)
    const dialog = new Dialog(window)
    window?.webContents.print({
        pageSize: 'A4',
        margins: {
            bottom: 10,
            left: 10,
            right: 10,
            top: 10,
        }
    }, (success) => {
        success && dialog.success('Sucesso!!', 'A Ordem de Serviço foi Impressa!!')
    })
  };

  @IpcEvent()
  printToPdf (event: Electron.IpcMainEvent, args?: any[]) {
    const window = BrowserWindow.fromWebContents(event.sender)
    const dialog = new Dialog(window)
    const pdfpath = dialog.openFile('Escolha a pasta para salvar o PDF', 'Salvar Ordem de Serviço Preventiva')
    if (pdfpath) {
      window?.webContents.printToPDF({
          pageSize: 'A4',
      })
      .then( pdf => {
        if (pdf) {
          fs.writeFileSync(path.join(pdfpath[0], `${args}.pdf`), pdf, 'binary')
          dialog.success('Sucesso!!', 'A Ordem de Serviço foi Salva!!')
        }
      })
      .catch( error => {
        dialog.error(String(error))
      })
    }
  }

}
