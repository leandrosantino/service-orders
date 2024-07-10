import { ExecuteServiceOrdersRequestDTO, IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PreventiveServiceOrderState } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrderState";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { Properties } from "@/domain/interfaces/Properties";
import { ResponseEntity } from "@/infra/ResponseEntity";

import { preventiveServiceOrderRepository, printedPreventiveServiceOrderRepository, serviceOrderRepository, workerRepository } from "@/infra/repositories";
import { DateTime } from "@/utils/DateTime";
import { IpcChannel, IpcMutation, IpcQuery } from "@/utils/decorators";
import { Between } from "typeorm";
import { ModalService } from "./ModalService";

export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {


  @IpcChannel()
  showServiceOrderDetails(plannedServiceOrderId: number): void {
    const modalService = new ModalService({
      title: 'Ordem de Serviço Preventiva',
      templateFilePath: 'serviceOrder.ejs',
      width: 900,
      height: 700
    })

    modalService.show({
      id: plannedServiceOrderId,
      machine: {tag: 'M21'},
      weekCode: '2024-W21',
      nature: {name: 'Elétrica'},
      actions: []
    })

  }

  @IpcQuery()
  async getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<Properties<PreventiveServiceOrder>[]> {
    try{
      const nextExecutionDate = new DateTime().fromWeekOfYearString(filters?.weekCode)
      const serviceOrders = await preventiveServiceOrderRepository.find({
        where: {
          nature: filters?.nature,
          machine: {
            id: filters?.machineId,
          },
          state: PreventiveServiceOrderState.PLANED,
          nextExecution: filters?.weekCode && Between(
            nextExecutionDate.getStartOfDay(),
            nextExecutionDate.getEndOfDay()
          )
        },
        relations: {machine: true}
      })

      return serviceOrders

    }catch(e){
      throw new Error('')
    }
  }

  @IpcQuery()
  async getPrintedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<Properties<PrintedPreventiveServiceOrder>[]> {
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
        order: {
          concluded: {
            direction: 'ASC'
          }
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
          concluded: true,
          weekCode: true,
          preventiveServiceOrder: {
            id: true,
            machine: {
              tag: true
            },
            nature: true
          },
          serviceOrder: {
            id: true,
            date: true,
            responsibles: true,
            durationInMinutes: true,
          }
        }
      })

      return serviceOrders

    }catch(e){
      throw new Error('')
    }
  }


  @IpcMutation()
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

  @IpcMutation()
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
        where: data.responsibles.map(id => ({id}))
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
