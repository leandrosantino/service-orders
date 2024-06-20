import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreventiveServiceOrder } from "../PreventiveServiceOrder/PreventiveServiceOrder";
import { ServiceOrder } from "../ServiceOrder/ServiceOrder";


@Entity('printed_preventive_service_order')
export class PrintedPreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @Column('nchar', {name: 'week_code'})
  weekCode?: string

  @Column('text', {name: 'preventive_actions'})
  preventiveActions?: string

  @Column('boolean', {name: 'concluded'})
  concluded: Boolean

  @ManyToOne(() => PreventiveServiceOrder, (preventiveServiceOrder) => preventiveServiceOrder.pendingPreventiveServiceOrders)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PreventiveServiceOrder

  @OneToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.preventiveServiceOrder)
  @JoinColumn({name: 'serviceOrderId'})
  serviceOrder: ServiceOrder


}
