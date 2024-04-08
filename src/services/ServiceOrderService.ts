import { ICreateServiceOrderRequestDTO, ISavePreventiveServiceOrderRequestDTO, ICloseServiceOrderDTO } from "@/domain/entities/ServiceOrder/dto/IServiceOrderDTO";
import { IServiceOrderService } from "@/domain/entities/ServiceOrder/IServiceOrderService";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { Properties } from "@/domain/interfaces/Properties";
import { IpcChannel } from "@/utils/decorators";

export class ServiceOrderService implements IServiceOrderService{


  @IpcChannel()
  createServiceOrder(data: ICreateServiceOrderRequestDTO): IResponseEntity<Properties<ServiceOrder>> {
    throw new Error("Method not implemented.");
  }

  @IpcChannel()
  savePreventiveServiceOrder(data: ISavePreventiveServiceOrderRequestDTO): IResponseEntity<Properties<ServiceOrder>> {
    throw new Error("Method not implemented.");
  }

  @IpcChannel()
  closeServiceOrder(data: ICloseServiceOrderDTO): IResponseEntity<Properties<ServiceOrder>> {
    throw new Error("Method not implemented.");
  }

  @IpcChannel()
  closePreventiveServiceOrder(data: ICreateServiceOrderRequestDTO): IResponseEntity<Properties<ServiceOrder>> {
    throw new Error("Method not implemented.");
  }

  @IpcChannel()
  listPreventiveServiceOrders(): IResponseEntity<Properties<ServiceOrder>[]> {
    throw new Error("Method not implemented.");
  }



}
