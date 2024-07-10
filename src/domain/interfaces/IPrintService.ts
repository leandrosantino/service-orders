import { BrowserWindow, IpcMainEvent } from "electron"
import { IpcEventFunction } from "./IpcEventFunction"

export interface IPrintService {
  print: (window: BrowserWindow) => Promise<void>
  printToPdf: (window: BrowserWindow, fileName: string) => Promise<void>
}
