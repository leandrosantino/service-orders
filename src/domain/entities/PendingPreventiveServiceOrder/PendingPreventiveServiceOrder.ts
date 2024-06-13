import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreventiveServiceOrder } from "../PreventiveServiceOrder/PreventiveServiceOrder";
import { ServiceOrder } from "../ServiceOrder/ServiceOrder";


@Entity('pending_preventive_service_order')
export class PendingPreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @Column('nchar', {name: 'week_code'})
  weekCode?: string

  @Column('text', {name: 'preventive_actions'})
  preventiveActions?: string

  @ManyToOne(() => PreventiveServiceOrder, (preventiveServiceOrder) => preventiveServiceOrder.pendingPreventiveServiceOrders)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PreventiveServiceOrder

  @OneToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.preventiveServiceOrder)
  @JoinColumn({name: 'serviceOrderId'})
  serviceOrder: ServiceOrder


}
