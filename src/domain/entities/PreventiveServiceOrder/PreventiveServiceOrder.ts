import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "../Machine/Machine";
import { Specialty } from "../Worker/Specialty";
import { PreventiveAction } from "../PreventiveAction/PreventiveAction";
import { PendingPreventiveServiceOrder } from "../PendingPreventiveServiceOrder/PendingPreventiveServiceOrder";

@Entity('preventive_service_order')
export class PreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @ManyToOne(()=> Machine)
  machine: Machine

  @Column('nchar', {name: 'nature'})
  nature: Specialty

  @Column('int', {name: 'frequency_in_weeks'})
  frequencyInWeeks: number

  @OneToMany(() => PreventiveAction, (preventiveAction)=> preventiveAction.preventiveServiceOrder)
  preventiveActions?: PreventiveAction[]

  @OneToMany(() => PendingPreventiveServiceOrder, (pendingPreventiveServiceOrders) => pendingPreventiveServiceOrders.preventiveServiceOrder)
  pendingPreventiveServiceOrders: PendingPreventiveServiceOrder[]

}
