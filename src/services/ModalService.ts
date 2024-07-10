import { BrowserWindow } from "electron";
import fs from 'fs'
import path from "path";
import ejs from 'ejs'

export class ModalService {

  htmlFilePath = path.join(__dirname, 'modal.html')
  props: {
    title: string,
    height: number,
    width: number,
    templateFilePath: string
  }

  constructor(props: ModalService['props']){
    this.props = props
  }

  show<T>(data?: T){
    let modalWindow = new BrowserWindow({
      title: this.props.title,
      height: this.props.height,
      width: this.props.width,
      minHeight: this.props.height,
      minWidth: this.props.width,
      show: false,
      parent: mainWindow,
      maximizable: false,
      minimizable: false,
      webPreferences:{
        devTools: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });

    const file = fs.readFileSync(this.props.templateFilePath).toString()
    const html = ejs.render(file, {data})

    fs.writeFileSync(this.htmlFilePath, html, {encoding: 'utf-8'})

    modalWindow.loadURL(`file:${this.htmlFilePath}`);
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
