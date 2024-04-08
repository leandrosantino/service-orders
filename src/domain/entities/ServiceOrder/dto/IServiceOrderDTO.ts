import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { Worker } from "@/domain/entities/Worker/Worker"
import { Properties } from "@/domain/interfaces/Properties";
import { Machine } from "@/domain/entities/Machine/Machine";

export interface ICloseServiceOrderDTO {
  serviceOrderId: ServiceOrder['id']
  responsiblesId: Array<Worker['id']>
  date: Date
}

const excludedProperties = [
  'machine',
  'responsibles',
  'preventiveActions',
  'createdAt',
  'id',
  'updatedAt'
] as const

export interface ICreateServiceOrderRequestDTO {
  data: Omit<Properties<ServiceOrder>, typeof excludedProperties[number] >
  responsiblesId: Array<Worker['id']>
  machineId: Machine['id']
}
