import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { PreventiveServiceOrder } from "./PreventiveServiceOrder";
import { Specialty } from "../Worker/Specialty";
import { PrintedPreventiveServiceOrder } from "../PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { DateTime } from "@/utils/DateTime";
import { Properties } from "@/domain/interfaces/Properties";

export type PreventiveServiceOrderFilters = {
  weekCode?: string
  machineId?: number
  nature?: Specialty
}

export type ExecuteServiceOrdersRequestDTO = {
  date: DateTime
  responsibles: Array<number>
  durationInMinutes: number
}

export interface IPreventiveServiceOrderService {
  getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<Properties<PreventiveServiceOrder>[]>
  getPrintedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<Properties<PrintedPreventiveServiceOrder>[]>
  printServiceOrder(plannedServiceOrderId: number, filename: string, toPdf: boolean): Promise< IResponseEntity<void> >
  executeServiceOrders(printedServiceOrderId: number, data: ExecuteServiceOrdersRequestDTO): Promise< IResponseEntity<void> >
  showServiceOrderDetails(printedServiceOrderId: number) : Promise<void>
}
