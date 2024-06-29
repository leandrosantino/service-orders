import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { PreventiveServiceOrder } from "./PreventiveServiceOrder";
import { Specialty } from "../Worker/Specialty";
import { PrintedPreventiveServiceOrder } from "../PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { DateTime } from "@/utils/DateTime";

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
  getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise< IResponseEntity<PreventiveServiceOrder[]> >
  getPrintedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise< IResponseEntity<PrintedPreventiveServiceOrder[]> >
  printServiceOrder(plannedServiceOrderId: number): Promise< IResponseEntity<void> >
  executeServiceOrders(printedServiceOrderId: number, data: ExecuteServiceOrdersRequestDTO): Promise< IResponseEntity<void> >
}
