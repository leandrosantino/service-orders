import { ExecuteServiceOrdersRequestDTO, IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Worker } from "@/domain/entities/Worker/Worker";

import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { database } from "@/infra/database";
import { PreventiveServiceOrderRepository } from "@/infra/repositories/PreventiveServiceOrderRepository";
import { PrintedPreventiveServiceOrderRepository } from "@/infra/repositories/PrintedPreventiveServiceOrderRepository";
import { ServiceOrderRepository } from "@/infra/repositories/ServiceOrderRepository";
import { DateTime } from "@/utils/DateTime";
import { Autowired, IpcChannel } from "@/utils/decorators";
import { Repository } from "typeorm";


export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {

  //@Autowired(PreventiveServiceOrderRepository)
  private repository: Repository<PreventiveServiceOrder> = database.getRepository(PreventiveServiceOrder)

  //@Autowired(PrintedPreventiveServiceOrderRepository)
  private printedPreventiveServiceOrderRepository: Repository<PrintedPreventiveServiceOrder> = database.getRepository(PrintedPreventiveServiceOrder)

  @Autowired(ServiceOrderRepository)
  serviceOrdersRepository: ServiceOrderRepository


  private workerRepository: Repository<Worker> = database.getRepository(Worker)

  @IpcChannel()
  async getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PreventiveServiceOrder[]>> {
    try{
      const serviceOrders = await this.repository.find({
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

      const serviceOrders = await this.printedPreventiveServiceOrderRepository.find({
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
      const plannedServiceOrder = await this.repository.findOne({
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

      const wasPrinted = await this.printedPreventiveServiceOrderRepository.existsBy({
        weekCode: plannedServiceOrder.nextExecution.toWeekOfYearString(),
        preventiveServiceOrder: {
          id: plannedServiceOrder.id
        }
      })

      if(wasPrinted) return {error: true, message: 'planned service order already been printed'}

      const printedServiceOrder = new PrintedPreventiveServiceOrder()
        .setConcluded(false)
        .setWeekCode(plannedServiceOrder.nextExecution.toWeekOfYearString())
        .setPreventiveActions(plannedServiceOrder.preventiveActions)

      this.printedPreventiveServiceOrderRepository.create(printedServiceOrder)

      return { error: false }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }

  async executeServiceOrders(printedServiceOrderId: number, data: ExecuteServiceOrdersRequestDTO): Promise<IResponseEntity<void>> {
    try {

      const {preventiveServiceOrder, ...printedServiceOrder} = await this.printedPreventiveServiceOrderRepository.findOne({
        where: { id: printedServiceOrderId },
        relations: {
          preventiveServiceOrder: true
        },
        select: { preventiveServiceOrder: { id: true, nature: true, nextExecution: true } }
      })

      if(!printedServiceOrder) return {error: true, message: 'printed service order not found!'}

      const responsibles = await this.workerRepository.find({
        where: data.responsibles
      })

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

      this.serviceOrdersRepository.create(serviceOrder)

      // this.printedPreventiveServiceOrderRepository.update(printedServiceOrder.id, {concluded: true})
      this.repository.update(preventiveServiceOrder.id, {
        nextExecution: preventiveServiceOrder.nextExecution.plusWeek(preventiveServiceOrder.frequencyInWeeks)
      })


      return { error: false }

    }catch(e){
      return {error: true,  message: (e as Error).message }
    }
  }



}
