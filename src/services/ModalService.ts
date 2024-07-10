import { BrowserWindow } from "electron";

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
        devTools: true
      }
    });

    modalWindow.loadURL('data:text/html;charset=utf-8,<h1>Leandro</h1>');
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
