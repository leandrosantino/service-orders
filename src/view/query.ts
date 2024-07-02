import { useQuery } from "@tanstack/react-query"

export const api = {
  preventiveServiceOrderService:{
    getPrintedServiceOrders: (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters) => {
      return useQuery({queryKey: ['getPrintedServiceOrders'], queryFn: ():Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder").PrintedPreventiveServiceOrder[]>> => {
        return window.app.ipc('getPrintedServiceOrders', filters)
      }})
    },
    executeServiceOrders: (printedServiceOrderId: number, data: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").ExecuteServiceOrdersRequestDTO) => {
      return useQuery({queryKey: ['executeServiceOrders'], queryFn: ():Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<void>> => {
        return window.app.ipc('executeServiceOrders', printedServiceOrderId, data)
      }})
    },
  },

}