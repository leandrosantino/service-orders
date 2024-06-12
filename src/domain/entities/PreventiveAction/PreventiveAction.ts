import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "@/domain/entities/Machine/Machine";
import { Specialty } from "@/domain/entities/Worker/Specialty";
import { PreventiveServiceOrder } from "../PreventiveServiceOrder/PreventiveServiceOrder";

@Entity({name: 'preventive_action'})
export class PreventiveAction {

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number

  @Column('nchar', {name: 'description'})
  description: string

  @Column('nchar', {name: 'execution'})
  excution: string

  @Column('date', {name: 'next_execution'})
  nextExecution: Date

  @ManyToOne(()=> Machine)
  machine: Machine

  @Column('nchar', {name: 'nature'})
  nature: Specialty

  @Column('int', {name: 'frequency_in_weeks'})
  frequencyInWeeks: number

  @ManyToOne(()=> PreventiveServiceOrder, (PreventiveServiceOrder) => PreventiveServiceOrder.preventiveActions)
  preventiveServiceOrder: PreventiveServiceOrder

  setDescription(value: string) {
    this.description = value
    return this
  }

  setExcution(value: string) {
    this.excution = value
    return this
  }

  setFrequencyInWeeks(value: number) {
    this.frequencyInWeeks = value
    return this
  }

  setNextExecution(value: Date) {
    this.nextExecution = value
    return this
  }

  setSpecialtys(value: Specialty) {
    this.nature = value
    return this
  }

}
