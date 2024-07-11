import { BrowserWindow, IpcMainEvent } from "electron"
import { IpcEventFunction } from "./IpcEventFunction"

export interface IPrintTool {
  print: (window: BrowserWindow) => Promise<void>
  printToPdf: (window: BrowserWindow, fileName: string) => Promise<void>
}
