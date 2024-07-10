import { BrowserWindow } from "electron";
import fs from 'fs'
import path from "path";
import ejs from 'ejs'

export class ModalService {

  mainWindow: BrowserWindow

  constructor(window: BrowserWindow){
    this.mainWindow = window
  }

  show(){
    let modalWindow = new BrowserWindow({
      title: 'Ordens de Serviço',
      minHeight: 700,
      minWidth: 900,
      show: false,
      parent: this.mainWindow,
      maximizable: false,
      minimizable: false,
      webPreferences:{
        devTools: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });

    const file = fs.readFileSync('serviceOrder.ejs').toString()

    const html = ejs.render(file, {data: {
      machine: {tag: 'M21'},
      weekCode: '2024-W21',
      nature: {name: 'Elétrica'},
      actions: []
    } })

    const htmlFilePath = path.join(__dirname, 'serviceOrder.html')

    fs.writeFileSync(htmlFilePath, html, {encoding: 'utf-8'})

    console.log(path.extname(__dirname))

    modalWindow.loadURL(`file:${htmlFilePath}`);
    modalWindow.setMenuBarVisibility(false)

    modalWindow.once('ready-to-show', async () => {
      modalWindow?.show()
    });

    modalWindow.on("closed", () => {
      modalWindow = null;
    });

    return modalWindow
  }

}
