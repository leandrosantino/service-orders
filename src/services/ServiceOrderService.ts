import { ICreateServiceOrderRequestDTO, ISavePreventiveServiceOrderRequestDTO, ICloseServiceOrderDTO } from "@/domain/entities/ServiceOrder/dto/IServiceOrderDTO";
import { IServiceOrderService } from "@/domain/entities/ServiceOrder/IServiceOrderService";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { Properties } from "@/domain/interfaces/Properties";
import { machineRepository, serviceOrderRepository } from "@/infra/repositories";
import { ResponseEntity } from "@/infra/ResponseEntity";
import { IpcChannel } from "@/utils/decorators";

export class ServiceOrderService implements IServiceOrderService{

  @IpcChannel()
  async createServiceOrder({data, machineId}: ICreateServiceOrderRequestDTO): Promise<IResponseEntity<Properties<ServiceOrder>>> {

    const response = new ResponseEntity<ServiceOrder>()

    const machine = machineRepository.findOneBy({
      id: machineId
    })

    if(machine === null){
      return response.falure('machine id not found')
    }

    const serviceOrder = new ServiceOrder()
      .setConcluded(false)
      .setSolutionDescription(data.solutionDescription)
      .setProblemDescription(data.problemDescription)
      .setDate(data.date)
      .setCreatedAt(data.createdAt)
      .setUpdatedAt(data.updatedAt)
      .setDurationInMinutes(data.durationInMinutes)
      .setSpecialty(data.specialty)
      .setType(data.type)

    await serviceOrderRepository.save(serviceOrder)

    return response.success(serviceOrder)

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
