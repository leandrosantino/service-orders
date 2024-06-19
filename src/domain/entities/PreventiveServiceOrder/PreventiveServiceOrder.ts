import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "../Machine/Machine";
import { Specialty } from "../Worker/Specialty";
import { PreventiveAction } from "../PreventiveAction/PreventiveAction";
import { PendingPreventiveServiceOrder } from "../PendingPreventiveServiceOrder/PendingPreventiveServiceOrder";
import { DateTransformer } from "@/utils/DateTransformer";
import { DateTime } from "@/utils/DateTime";

@Entity('preventive_service_order')
export class PreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @ManyToOne(()=> Machine)
  @JoinColumn({name: 'machineId'})
  machine: Machine

  @Column('nchar', {name: 'nature'})
  nature: Specialty

  @Column('datetime', {name: 'next_execution', nullable: true, transformer: new DateTransformer()})
  nextExecution: DateTime

  @Column('int', {name: 'frequency_in_weeks'})
  frequencyInWeeks: number

  @OneToMany(() => PreventiveAction, (preventiveAction)=> preventiveAction.preventiveServiceOrder)
  preventiveActions?: PreventiveAction[]

  @OneToMany(() => PendingPreventiveServiceOrder, (pendingPreventiveServiceOrders) => pendingPreventiveServiceOrders.preventiveServiceOrder)
  pendingPreventiveServiceOrders: PendingPreventiveServiceOrder[]

}
