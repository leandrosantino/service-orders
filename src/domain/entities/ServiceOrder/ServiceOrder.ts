import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { WorkerSpecialtys } from "@/domain/entities/Worker/WorkerSpecialtys";
import { Worker } from "@/domain/entities/Worker/Worker";
import { Machine } from "@/domain/entities/Machine/Machine";
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Cause } from "../Cause/Cause";

@Entity({name: 'service_order'})
export class ServiceOrder {

  @PrimaryColumn({type: 'nchar', name: 'id'})
  @Generated("uuid")
  id: number

  @Column('nchar', {nullable: true, name: 'week_code'})
  weekCode?: string

  @Column('date', {name: 'date'})
  date: Date

  @Column('nchar', {name: 'problem_description'})
  problemDescription : string

  @Column('nchar', {name: 'solution_description'})
  solutionDescription : string

  @CreateDateColumn({})
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('int', {name: 'duration_in_minutes'})
  durationInMinutes: number

  @Column('boolean', {name: 'concluded'})
  concluded: boolean

  @Column('nchar', {name: 'type'})
  type: ServiceOrderTypes

  @Column('nchar', {nullable: true, name: 'specialty'})
  specialty?: WorkerSpecialtys

  @ManyToOne(() => Machine, (machine) => machine.serviceOrders)
  machine: Machine

  @ManyToOne(() => Cause, (cause) => cause.serviceOrders)
  cause: Cause

  @ManyToMany(() => Worker, {nullable: true})
  @JoinColumn({name: 'responsibles'})
  responsibles?: Worker[]

  @OneToMany(() => PreventiveAction, (preventiveAction)=> preventiveAction.serviceOrder, {nullable: true})
  preventiveActions?: PreventiveAction[]

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
  setSpecialty(value: WorkerSpecialtys){
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
