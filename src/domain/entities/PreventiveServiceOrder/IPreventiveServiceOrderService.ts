import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { PreventiveServiceOrder } from "./PreventiveServiceOrder";
import { Specialty } from "../Worker/Specialty";

export interface PreventiveServiceOrderFilters {
  weekCode?: string
  machineId?: number
  nature?: Specialty
}

export interface IPreventiveServiceOrderService {
  getPlannedServiceOrders(filters: PreventiveServiceOrderFilters): Promise<IResponseEntity<PreventiveServiceOrder[]>>
}
