import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { Worker } from "@/domain/entities/Worker/Worker"
import { Properties } from "@/domain/interfaces/Properties";
import { Machine } from "@/domain/entities/Machine/Machine";
import { PreventiveAction } from "../../PreventiveAction/PreventiveAction";
import { Cause } from "../../Cause/Cause";

export interface ICloseServiceOrderDTO {
  serviceOrderId: ServiceOrder['id']
  responsiblesId: Array<Worker['id']>
  causeId: Cause['id']
  date: Date
}

export type ServiceOrderResponseDTO = Properties<ServiceOrder>

const excludedProperties  = [
  'machine',
  'responsibles',
  'preventiveActions',
  'createdAt',
  'id',
  'updatedAt',
  'cause',
  'concluded'
] as const

export interface ICreateServiceOrderRequestDTO {
  data: Omit<ServiceOrderResponseDTO, typeof excludedProperties[number] >
  machineId: Machine['id']
}

export interface ISavePreventiveServiceOrderRequestDTO extends ICreateServiceOrderRequestDTO {
  preventiveActions: Array<PreventiveAction['id']>
}
