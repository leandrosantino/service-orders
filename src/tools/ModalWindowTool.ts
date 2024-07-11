import { BrowserWindow } from "electron";
import fs from 'fs'
import path from "path";
import ejs from 'ejs'

export class ModalWindowTool {

  htmlFilePath = path.join(__dirname, 'modal.html')
  props: {
    title: string,
    height: number,
    width: number,
    templateFilePath: string,
    onClose: () => void
  }

  constructor(props: ModalWindowTool['props']){
    this.props = props
  }

  show<T>(data: T){

    if(currentModalWindow !== null){
      return null
    }

    currentModalWindow = new BrowserWindow({
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

    currentModalWindow.loadURL(`file:${this.htmlFilePath}`);
    currentModalWindow.setMenuBarVisibility(false)

    currentModalWindow.once('ready-to-show', async () => {
      currentModalWindow?.show()
    });

    currentModalWindow.on("closed", () => {
      mainWindow.focus()
      currentModalWindow = null
      this.props.onClose()
    });

    return currentModalWindow
  }

}
