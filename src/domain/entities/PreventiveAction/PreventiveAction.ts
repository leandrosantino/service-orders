import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(()=> PreventiveServiceOrder, (PreventiveServiceOrder) => PreventiveServiceOrder.preventiveActions)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PreventiveServiceOrder

  setDescription(value: string) {
    this.description = value
    return this
  }

  setExcution(value: string) {
    this.excution = value
    return this
  }

  // setFrequencyInWeeks(value: number) {
  //   this.frequencyInWeeks = value
  //   return this
  // }

  // setNextExecution(value: Date) {
  //   this.nextExecution = value
  //   return this
  // }

  // setSpecialtys(value: Specialty) {
  //   this.nature = value
  //   return this
  // }

}

  // @ManyToOne(()=> Machine)
  // machine: Machine

  // @Column('nchar', {name: 'nature'})
  // nature: Specialty

  // @Column('int', {name: 'frequency_in_weeks'})
  // frequencyInWeeks: number
