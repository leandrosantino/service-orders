import { IpcMainEvent } from "electron"
import { IpcEventFunction } from "./IpcEventFunction"

export interface IPrintService {
  print: (event:IpcMainEvent, args?:any[]) => void
  printToPdf: (event:IpcMainEvent, args?:any[]) => void
}
