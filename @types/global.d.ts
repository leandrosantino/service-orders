import { BrowserWindow } from "electron";


declare global {
  let mainWindow: BrowserWindow
  let currentModalWindow: BrowserWindow
}

