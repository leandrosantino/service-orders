import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from "typeorm";
import { Machine } from "@/domain/entities/Machine/Machine";
import { WorkerSpecialtys } from "@/domain/entities/Worker/WorkerSpecialtys";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";

@Entity({name: 'preventive_action'})
export class PreventiveAction {

  @PrimaryColumn({type: 'nchar', name: 'id'})
  @Generated("uuid")
  id: number

  @Column('nchar', {name: 'description'})
  description: string

  @Column('nchar', {name: 'execution'})
  excution: string

  @Column('int', {name: 'frequency_in_weeks'})
  frequencyInWeeks: number

  @Column('date', {name: 'next_execution'})
  nextExecution: Date

  @Column('boolean', {name: 'ignore'})
  ignore: boolean

  @Column('nchar', {name: 'specialtys'})
  specialtys: WorkerSpecialtys

  @ManyToOne(()=> Machine)
  machine: Machine

  @ManyToOne(()=> ServiceOrder, (serviceOrder) => serviceOrder.preventiveActions)
  serviceOrder: ServiceOrder

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

  setIgnore(value: boolean) {
    this.ignore = value
    return this
  }

  setSpecialtys(value: WorkerSpecialtys) {
    this.specialtys = value
    return this
  }

}
