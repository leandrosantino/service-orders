import { IMachineRepository } from "@/domain/entities/Machine/IMachineRepository";
import { ICreateServiceOrderRequestDTO, ISavePreventiveServiceOrderRequestDTO, ICloseServiceOrderDTO } from "@/domain/entities/ServiceOrder/dto/IServiceOrderDTO";
import { IServiceOrderRepository } from "@/domain/entities/ServiceOrder/IServiceOrderRepository";
import { IServiceOrderService } from "@/domain/entities/ServiceOrder/IServiceOrderService";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { Properties } from "@/domain/interfaces/Properties";
import { MachineRepository } from "@/infra/repositories/MachineRepository";
import { ServiceOrderRepository } from "@/infra/repositories/ServiceOrderRepository";
import { ResponseEntity } from "@/infra/ResponseEntity";
import { Autowired, IpcChannel } from "@/utils/decorators";

export class ServiceOrderService implements IServiceOrderService{

  @Autowired(ServiceOrderRepository)
  serviceOrderRepository: IServiceOrderRepository

  @Autowired(MachineRepository)
  machineRepository: IMachineRepository

  @IpcChannel()
  createServiceOrder({data, machineId}: ICreateServiceOrderRequestDTO): IResponseEntity<Properties<ServiceOrder>> {

    const response = new ResponseEntity<ServiceOrder>()

    const machine = this.machineRepository.findOneBy({
      id: machineId
    })

    if(machine === null){
      return response.setError(true).setMessage('machine id not found').build()
    }

    const serviceOrder = new ServiceOrder()
      .setConcluded(false)
      .setDate(data.date)
      .setDurationInMinutes(data.durationInMinutes)
      .setSpecialty(data.specialty)
      .setType(data.type)

    return response.setData(serviceOrder)

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
