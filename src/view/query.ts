import { useQuery } from "@tanstack/react-query"

export const getPlannedServiceOrders = (filters: import("@/domain/entities/PreventiveServiceOrder/IPreventiveServiceOrderService").PreventiveServiceOrderFilters) => {
  return useQuery({ queryKey: ['preventives'], queryFn: ():Promise<import("@/domain/interfaces/IResponseEntity").IResponseEntity<import("@/domain/entities/PreventiveServiceOrder/PreventiveServiceOrder").PreventiveServiceOrder[]>> => {
    return window.app.ipc('getPlannedServiceOrders', filters)
  } })
}
