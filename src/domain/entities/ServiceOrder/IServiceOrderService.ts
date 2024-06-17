import {
  ICloseServiceOrderDTO,
  ICreateServiceOrderRequestDTO,
  ISavePreventiveServiceOrderRequestDTO,
  ServiceOrderResponseDTO
} from "@/domain/entities/ServiceOrder/dto/IServiceOrderDTO";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";

export interface IServiceOrderService {
  createServiceOrder(data: ICreateServiceOrderRequestDTO): IResponseEntity<ServiceOrderResponseDTO>
  savePreventiveServiceOrder(data: ISavePreventiveServiceOrderRequestDTO): IResponseEntity<ServiceOrderResponseDTO>
  closeServiceOrder(data: ICloseServiceOrderDTO): IResponseEntity<ServiceOrderResponseDTO>
  closePreventiveServiceOrder(data: ICreateServiceOrderRequestDTO): IResponseEntity<ServiceOrderResponseDTO>
  listPreventiveServiceOrders(): IResponseEntity<ServiceOrderResponseDTO[]>
}
