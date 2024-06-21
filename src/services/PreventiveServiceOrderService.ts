import { IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";
import { PrintedPreventiveServiceOrder } from "@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";

import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { PreventiveServiceOrderRepository } from "@/infra/repositories/PreventiveServiceOrderRepository";
import { PrintedPreventiveServiceOrderRepository } from "@/infra/repositories/PrintedPreventiveServiceOrderRepository";
import { DateTime } from "@/utils/DateTime";
import { Autowired, IpcChannel } from "@/utils/decorators";
import { FindOptionsSelect } from "typeorm/find-options/FindOptionsSelect";


export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {

  @Autowired(PreventiveServiceOrderRepository)
  repository: PreventiveServiceOrderRepository

  @Autowired(PrintedPreventiveServiceOrderRepository)
  printedPreventiveServiceOrderRepository: PrintedPreventiveServiceOrderRepository

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

      return {
        error: false,
        data: serviceOrders
      }
    }catch(e){
      return {
        error: true,
        message: (e as Error).message
      }
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

      return {
        error: false,
        data: serviceOrders
      }

    }catch(e){
      return {
        error: true
      }
    }
  }


  @IpcChannel()
  async printServiceOrder(plannedServiceOrderId: number): Promise<IResponseEntity<void>> {

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

    const isPrinted = await this.printedPreventiveServiceOrderRepository.existsBy({
      weekCode: plannedServiceOrder.nextExecution.toWeekOfYearString(),
      preventiveServiceOrder: {
        id: plannedServiceOrder.id
      }
    })

    if(isPrinted) return {error: true, message: 'planned service order already printed'}

    const printedServiceOrder = new PrintedPreventiveServiceOrder()
      .setConcluded(false)
      .setWeekCode(plannedServiceOrder.nextExecution.toWeekOfYearString())
      .setPreventiveActions(plannedServiceOrder.preventiveActions)

    this.printedPreventiveServiceOrderRepository.create(printedServiceOrder)

    return {
      error: false,
    }
  }



}
