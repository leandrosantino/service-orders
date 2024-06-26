import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PreventiveServiceOrder } from "../PreventiveServiceOrder/PreventiveServiceOrder";
import { ServiceOrder } from "../ServiceOrder/ServiceOrder";
import { PreventiveAction } from "../PreventiveAction/PreventiveAction";
import { z } from "zod";
import { JsonTransformer } from "@/transformers/JsonTransformer";


@Entity('printed_preventive_service_order')
export class PrintedPreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @Column('nchar', {name: 'week_code'})
  weekCode: string

  @Column('text', {name: 'preventive_actions', transformer: new JsonTransformer(z.array(PreventiveAction.schema))})
  preventiveActions: PreventiveAction[]

  @Column('boolean', {name: 'concluded'})
  concluded: Boolean

  @ManyToOne(() => PreventiveServiceOrder, (preventiveServiceOrder) => preventiveServiceOrder.pendingPreventiveServiceOrders)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PreventiveServiceOrder

  @OneToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.preventiveServiceOrder)
  @JoinColumn({name: 'serviceOrderId'})
  serviceOrder: ServiceOrder


  setPreventiveServiceOrder(value: PreventiveServiceOrder){
    this.preventiveServiceOrder = value
    return this
  }

  setConcluded(value: boolean){
    this.concluded = value
    return this
  }

  setWeekCode(value: string){
    this.weekCode = value
    return this
  }

  setPreventiveActions(value: PreventiveAction[]){
    this.preventiveActions = value
    return this
  }

}
