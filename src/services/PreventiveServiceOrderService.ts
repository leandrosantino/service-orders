import { ExecuteServiceOrdersRequestDTO, IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { ResponseEntity } from "@/infra/ResponseEntity";

import { preventiveServiceOrderRepository, printedPreventiveServiceOrderRepository, serviceOrderRepository, workerRepository } from "@/infra/repositories";
import { DateTime } from "@/utils/DateTime";
import { IpcChannel } from "@/utils/decorators";

export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {


  @IpcChannel()
  async getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PreventiveServiceOrder[]>> {
    const response = new ResponseEntity<PreventiveServiceOrder[]>()
    try{
      const serviceOrders = await preventiveServiceOrderRepository.find({
        where: {
          nature: filters?.nature,
          machine: {
            id: filters?.machineId
          },
          nextExecution: filters?.weekCode && new DateTime().fromWeekOfYearString(filters?.weekCode)
        }
      })

      return response.success(serviceOrders)

    }catch(e){
      return response.falure((e as Error).message)
    }
  }

  @IpcChannel()
  async getPrintedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PrintedPreventiveServiceOrder[]>> {
    const response = new ResponseEntity<PrintedPreventiveServiceOrder[]>()
    try{
      const serviceOrders = await printedPreventiveServiceOrderRepository.find({
        where: {
          weekCode: filters?.weekCode,
          preventiveServiceOrder:{
            nature: filters?.nature,
            machine: {
              id: filters?.machineId
            },
          },
        },
        relations: {
          preventiveServiceOrder: {
            machine: true
          },
          serviceOrder: {
            responsibles: true
          }
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

      return response.success(serviceOrders)

    }catch(e){
      return response.falure((e as Error).message)
    }
  }


  @IpcChannel()
  async printServiceOrder(plannedServiceOrderId: number): Promise<IResponseEntity<void>> {
    const response = new ResponseEntity<void>()
    try {
      const plannedServiceOrder = await preventiveServiceOrderRepository.findOne({
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

      if(!plannedServiceOrder) return response.falure('planned service order not found')

      const wasPrinted = await printedPreventiveServiceOrderRepository.existsBy({
        weekCode: plannedServiceOrder.nextExecution.toWeekOfYearString(),
        preventiveServiceOrder: {
          id: plannedServiceOrder.id
        }
      })

      if(wasPrinted) return response.falure('planned service order already been printed')

      const printedServiceOrder = new PrintedPreventiveServiceOrder()
        .setConcluded(false)
        .setWeekCode(plannedServiceOrder.nextExecution.toWeekOfYearString())
        .setPreventiveActions(plannedServiceOrder.preventiveActions)
        .setPreventiveServiceOrder(plannedServiceOrder)


      printedPreventiveServiceOrderRepository.save(printedServiceOrder)

      preventiveServiceOrderRepository.update(plannedServiceOrder.id, {
        state: PreventiveServiceOrderState.PRINTED
      })

      return response.success()

    }catch(e){
      return response.falure((e as Error).message)
    }
  }

  async executeServiceOrders(printedServiceOrderId: number, data: ExecuteServiceOrdersRequestDTO): Promise<IResponseEntity<void>> {
    const response = new ResponseEntity<void>()
    try {
      const printedServiceOrder = await printedPreventiveServiceOrderRepository.findOne({
        where: { id: printedServiceOrderId },
        relations: {
          preventiveServiceOrder: {
            machine: true
          }
        },
        select: { preventiveServiceOrder: { id: true, nature: true, nextExecution: true, frequencyInWeeks: true } }
      })

      const preventiveServiceOrder = printedServiceOrder.preventiveServiceOrder

      if(!printedServiceOrder) return response.falure('printed service order not found!')
      if(printedServiceOrder.concluded) return response.falure('service order already executed')

      const responsibles = await workerRepository.find({
        where: data.responsibles
      })

      if(data.responsibles.length !== responsibles.length) return response.falure('responsibles not found')

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
        .setPreventiveServiceOrder(printedServiceOrder)

      await serviceOrderRepository.save(serviceOrder)

      printedPreventiveServiceOrderRepository.update(printedServiceOrder.id, {concluded: true, serviceOrder: {id: serviceOrder.id} })
      preventiveServiceOrderRepository.update(preventiveServiceOrder.id, {
        state: PreventiveServiceOrderState.PLANED,
        nextExecution: preventiveServiceOrder.nextExecution.plusWeek(preventiveServiceOrder.frequencyInWeeks)
      })

      return response.success()

    }catch(e){
      return response.falure((e as Error).message)
    }
  }



}
