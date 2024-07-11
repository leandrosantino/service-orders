import { BrowserWindow, dialog } from 'electron'

export class DialogTool {
  window: BrowserWindow

  constructor(window: BrowserWindow) {
    this.window = window
  }

  openFile(message: string, title: string) {
    const resp = dialog.showOpenDialogSync(this.window, {
      message, title,
      securityScopedBookmarks: true,
      properties: ['openDirectory',],
    })
    return resp
  }


  success(title: string, message: string) {
    dialog.showMessageBoxSync(this.window, {
      message,
      title,
      type: 'info'
    })
  }

  error(message: string) {
    dialog.showErrorBox('Erro!', message)
  }

}
