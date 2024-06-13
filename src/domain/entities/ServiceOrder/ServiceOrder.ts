import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Specialty } from "@/domain/entities/Worker/Specialty";
import { Worker } from "@/domain/entities/Worker/Worker";
import { Machine } from "@/domain/entities/Machine/Machine";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Cause } from "../Cause/Cause";
import { PendingPreventiveServiceOrder } from "../PendingPreventiveServiceOrder/PendingPreventiveServiceOrder";

@Entity({name: 'service_order'})
export class ServiceOrder {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column('nchar', {nullable: true, name: 'week_code'})
  weekCode?: string

  @Column('date', {name: 'date'})
  date: Date

  @Column('nchar', {name: 'problem_description'})
  problemDescription : string

  @Column('nchar', {name: 'solution_description'})
  solutionDescription : string

  @CreateDateColumn({name: 'createdAt'})
  createdAt: Date

  @UpdateDateColumn({name: 'updatedAt'})
  updatedAt: Date

  @Column('int', {name: 'duration_in_minutes'})
  durationInMinutes: number

  @Column('boolean', {name: 'concluded'})
  concluded: boolean

  @Column('nchar', {name: 'type'})
  type: ServiceOrderTypes

  @Column('nchar', {nullable: true, name: 'specialty'})
  specialty?: Specialty

  @ManyToOne(() => Machine, (machine) => machine.serviceOrders)
  @JoinColumn({name: 'machineId'})
  machine: Machine

  @ManyToOne(() => Cause, (cause) => cause.serviceOrders)
  @JoinColumn({name: 'causeId'})
  cause: Cause

  @ManyToMany(() => Worker, (worker) => worker.serviceOrders, {nullable: true})
  @JoinTable({name: 'service_order_responsibles'})
  responsibles?: Worker[]

  @OneToOne(() => PendingPreventiveServiceOrder, (pendingPreventiveServiceOrder) => pendingPreventiveServiceOrder.serviceOrder)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PendingPreventiveServiceOrder

  setWeekCode(value: string){
    this.weekCode = value
    return this
  }
  setDate(value: Date){
    this.date = value
    return this
  }
  setCreatedAt(value: Date){
    this.createdAt = value
    return this
  }
  setUpdatedAt(value: Date){
    this.updatedAt = value
    return this
  }
  setDurationInMinutes(value: number){
    this.durationInMinutes = value
    return this
  }
  setConcluded(value: boolean){
    this.concluded = value
    return this
  }
  setType(value: ServiceOrderTypes){
    this.type = value
    return this
  }
  setSpecialty(value: Specialty){
    this.specialty = value
    return this
  }
  setMachine(value: Machine){
    this.machine = value
    return this
  }
  setCause(value: Cause){
    this.cause = value
    return this
  }

}
