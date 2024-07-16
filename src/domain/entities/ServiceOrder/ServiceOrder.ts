import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Specialty } from "@/domain/entities/Worker/Specialty";
import { Worker } from "@/domain/entities/Worker/Worker";
import { Machine } from "@/domain/entities/Machine/Machine";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Cause } from "../Cause/Cause";
import { PrintedPreventiveServiceOrder } from "../PrintedPreventiveServiceOrder/PrintedPreventiveServiceOrder";
import { DateTime } from "@/utils/DateTime";
import { DateTransformer } from "@/transformers/DateTransformer";
import { Turn } from '@/domain/entities/ServiceOrder/Turn'

@Entity({name: 'service_order'})
export class ServiceOrder {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column('datetime', {name: 'date', transformer: new DateTransformer()})
  date: DateTime

  @Column('nchar', {name: 'problem_description'})
  problemDescription : string

  @Column('nchar', {name: 'solution_description'})
  solutionDescription : string

  @CreateDateColumn({type: 'datetime', name: 'createdAt', transformer: new DateTransformer() })
  createdAt: DateTime

  @UpdateDateColumn({type: 'datetime', name: 'updatedAt', transformer: new DateTransformer() })
  updatedAt: DateTime

  @Column('int', {name: 'duration_in_minutes'})
  durationInMinutes: number

  @Column('boolean', {name: 'concluded'})
  concluded: boolean

  @Column('nchar', {name: 'type'})
  type: ServiceOrderTypes

  @Column('nchar', {nullable: true, name: 'specialty'})
  specialty?: Specialty

  @Column('nchar', {nullable: true, name: 'turn'})
  turn: Turn

  @Column('text', {nullable: true, name: 'comments'})
  comments?: string

  @ManyToOne(() => Machine, (machine) => machine.serviceOrders)
  @JoinColumn({name: 'machineId'})
  machine: Machine

  @ManyToOne(() => Cause, (cause) => cause.serviceOrders)
  @JoinColumn({name: 'causeId'})
  cause: Cause

  @ManyToMany(() => Worker, (worker) => worker.serviceOrders, {nullable: true})
  @JoinTable({name: 'service_order_responsibles'})
  responsibles?: Worker[]

  @OneToOne(() => PrintedPreventiveServiceOrder, (printedPreventiveServiceOrder) => printedPreventiveServiceOrder.serviceOrder)
  @JoinColumn({name: 'preventiveServiceOrderId'})
  preventiveServiceOrder: PrintedPreventiveServiceOrder

  setPreventiveServiceOrder(value: PrintedPreventiveServiceOrder){
    this.preventiveServiceOrder = value
    return this
  }

  setResponsibles(value: Worker[]){
    this.responsibles = value
    return this
  }

  setProblemDescription(value: string){
    this.problemDescription = value
    return this
  }

  setSolutionDescription(value: string){
    this.solutionDescription = value
    return this
  }

  setDate(value: DateTime){
    this.date = value
    return this
  }
  setCreatedAt(value: DateTime){
    this.createdAt = value
    return this
  }
  setUpdatedAt(value: DateTime){
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

  setTurn(value: Turn){
    this.turn = value
    return this
  }
  setComments(value: string){
    this.comments = value
    return this
  }

}
