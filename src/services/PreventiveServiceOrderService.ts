import { IPreventiveServiceOrderService, PreventiveServiceOrderFilters } from "@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService";
import { PreventiveServiceOrder } from "@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder";

import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";
import { PreventiveServiceOrderRepository } from "@/infra/repositories/PreventiveServiceOrderRepository";
import { DateTime } from "@/utils/DateTime";
import { Autowired, IpcChannel } from "@/utils/decorators";

export class PreventiveServiceOrderService implements IPreventiveServiceOrderService {

  @Autowired(PreventiveServiceOrderRepository)
  repository: PreventiveServiceOrderRepository

  @IpcChannel()
  async getPlannedServiceOrders(filters?: PreventiveServiceOrderFilters): Promise<IResponseEntity<PreventiveServiceOrder[]>> {

    const serviceOrders = await this.repository.find({
      where: {
        nature: filters?.nature,
        machine: {
          id: filters?.machineId
        },
        nextExecution: new DateTime().fromWeekOfYearString(filters.weekCode)
      }
    })


    return {
      error: false,
      data: serviceOrders
    }

  }

}
