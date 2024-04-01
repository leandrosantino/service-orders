import { ServiceOrder } from "./ServiceOrder";

export interface IServiceOrderRepository {
  getByNumber(serviceOrderNumber: number): ServiceOrder
  findByFilters(filters: {date: Date, status: string}): ServiceOrder
  create(data: ServiceOrder): void
}
