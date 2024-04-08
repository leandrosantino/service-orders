import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "@/domain/entities/Machine/Machine";
import { WorkerSpecialtys } from "@/domain/entities/Worker/WorkerSpecialtys";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";

@Entity()
export class PreventiveAction {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  description: string

  @Column('nchar')
  excution: string

  @Column('int')
  frequencyInWeeks: number

  @Column('nchar')
  nextExecution: string

  @Column('boolean')
  ignore: boolean

  @Column('nchar')
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
  setNextExecution(value: string) {
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
