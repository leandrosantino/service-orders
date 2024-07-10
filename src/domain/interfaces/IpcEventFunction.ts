import { IpcMainEvent } from "electron";

export type IpcEventFunction<T> = (event:IpcMainEvent, args?:T) => void
