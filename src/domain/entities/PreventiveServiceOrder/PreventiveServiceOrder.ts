import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "../Machine/Machine";
import { Specialty } from "../Worker/Specialty";
import { PreventiveAction } from "../PreventiveAction/PreventiveAction";
import { PrintedPreventiveServiceOrder } from "../PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { DateTransformer } from "@/transformers/DateTransformer";
import { DateTime } from "@/utils/DateTime";
import { PreventiveServiceOrderState } from "./PreventiveServiceOrderState";

@Entity('preventive_service_order')
export class PreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @ManyToOne(()=> Machine)
  @JoinColumn({name: 'machineId'})
  machine: Machine

  @Column('nchar', {name: 'nature'})
  nature: Specialty

  @Column('date', {name: 'next_execution', nullable: true, transformer: new DateTransformer('date')})
  nextExecution: DateTime

  @Column('int', {name: 'frequency_in_weeks'})
  frequencyInWeeks: number

  @OneToMany(() => PreventiveAction, (preventiveAction)=> preventiveAction.preventiveServiceOrder)
  preventiveActions?: PreventiveAction[]

  @OneToMany(() => PrintedPreventiveServiceOrder, (printedPreventiveServiceOrder) => printedPreventiveServiceOrder.preventiveServiceOrder)
  pendingPreventiveServiceOrders: PrintedPreventiveServiceOrder[]

  @Column('nchar', {name: 'state'})
  state: PreventiveServiceOrderState

}
