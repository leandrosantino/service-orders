import { ICloseServiceOrderDTO, ICreateServiceOrderRequestDTO } from "@/domain/entities/ServiceOrder/dto/IServiceOrderDTO";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";

export interface IServiceOrderService {
  createServiceOrder(data: ICreateServiceOrderRequestDTO): IResponseEntity<ServiceOrder>
  closeServiceOrder(data: ICloseServiceOrderDTO): IResponseEntity<ServiceOrder>
  savePreventiveServiceOrder(): void
  listPreventiveServiceOrders(): void
  closePreventiveServiceOrder(): void
}
