import { ExecuteServiceOrdersRequestDTO, IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Worker } from "@/domain/entities/Worker/Worker";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { database } from "@/infra/database";
import { DateTime } from "@/utils/DateTime";
import { IpcChannel } from "@/utils/decorators";



export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {

  private preventiveServiceRepository = database.getRepository(PreventiveServiceOrder)
  private printedServiceOrderRepository = database.getRepository(PrintedPreventiveServiceOrder)
  private serviceOrdersRepository =  database.getRepository(ServiceOrder)
  private workerRepository = database.getRepository(Worker)

  @IpcChannel()
  async getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PreventiveServiceOrder[]>> {
    try{
      const serviceOrders = await this.preventiveServiceRepository.find({
        where: {
          nature: filters?.nature,
          machine: {
            id: filters?.machineId
          },
          nextExecution: filters?.weekCode && new DateTime().fromWeekOfYearString(filters?.weekCode)
        }
      })

      return { error: false,data: serviceOrders }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }

  @IpcChannel()
  async getPrintedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PrintedPreventiveServiceOrder[]>> {
    try{

      const serviceOrders = await this.printedServiceOrderRepository.find({
        where: {
          preventiveServiceOrder:{
            nature: filters?.nature,
            machine: {
              id: filters?.machineId
            },
            nextExecution: filters?.weekCode && new DateTime().fromWeekOfYearString(filters?.weekCode)
          },
        },
        select: {
          id: true,
          preventiveActions: true,
          concluded: {},
          preventiveServiceOrder: {
            machine: {
              tag: true
            },
            nature: true
          },
          serviceOrder: {
            date: true,
            responsibles: true,
            durationInMinutes: true,
          }
        }
      })

      return { error: false, data: serviceOrders }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }


  @IpcChannel()
  async printServiceOrder(plannedServiceOrderId: number): Promise<IResponseEntity<void>> {
    try {
      const plannedServiceOrder = await this.preventiveServiceRepository.findOne({
        where: {
          id: plannedServiceOrderId
        },
        relations: {
          preventiveActions: true
        },
        select: {
          preventiveActions: {
            id: true,
            description: true,
            excution: true
          }
        }
      })

      if(!plannedServiceOrder) return {error: true, message: 'planned service order not found'}

      const wasPrinted = await this.printedServiceOrderRepository.existsBy({
        weekCode: plannedServiceOrder.nextExecution.toWeekOfYearString(),
        preventiveServiceOrder: {
          id: plannedServiceOrder.id
        }
      })

      console.log(wasPrinted)

      if(wasPrinted) return {error: true, message: 'planned service order already been printed'}

      const printedServiceOrder = new PrintedPreventiveServiceOrder()
        .setConcluded(false)
        .setWeekCode(plannedServiceOrder.nextExecution.toWeekOfYearString())
        .setPreventiveActions(plannedServiceOrder.preventiveActions)
        .setPreventiveServiceOrder(plannedServiceOrder)


      this.printedServiceOrderRepository.save(printedServiceOrder)

      return { error: false }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }

  async executeServiceOrders(printedServiceOrderId: number, data: ExecuteServiceOrdersRequestDTO): Promise<IResponseEntity<void>> {
    try {

      const {preventiveServiceOrder, ...printedServiceOrder} = await this.printedServiceOrderRepository.findOne({
        where: { id: printedServiceOrderId },
        relations: {
          preventiveServiceOrder: {
            machine: true
          }
        },
        select: { preventiveServiceOrder: { id: true, nature: true, nextExecution: true, frequencyInWeeks: true } }
      })

      console.log(preventiveServiceOrder)

      if(!printedServiceOrder) return {error: true, message: 'printed service order not found!'}
      if(printedServiceOrder.concluded) return {error: true, message: 'service order already executed'}

      const responsibles = await this.workerRepository.find({
        where: data.responsibles
      })

      if(data.responsibles.length !== responsibles.length) return {error: true, message: 'responsibles not found'}

      const serviceOrder = new ServiceOrder()
        .setConcluded(true)
        .setDate(data.date)
        .setDurationInMinutes(data.durationInMinutes)
        .setType(ServiceOrderTypes.PREVENTIVE)
        .setSpecialty(preventiveServiceOrder.nature)
        .setProblemDescription('')
        .setSolutionDescription('')
        .setCreatedAt(data.date)
        .setUpdatedAt(data.date)
        .setMachine(preventiveServiceOrder.machine)
        .setResponsibles(responsibles)

      await this.serviceOrdersRepository.save(serviceOrder)

      this.printedServiceOrderRepository.update(printedServiceOrder.id, {concluded: true, serviceOrder: {id: serviceOrder.id} })
      this.preventiveServiceRepository.update(preventiveServiceOrder.id, {
        nextExecution: preventiveServiceOrder.nextExecution.plusWeek(preventiveServiceOrder.frequencyInWeeks)
      })

      return { error: false }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }



}
