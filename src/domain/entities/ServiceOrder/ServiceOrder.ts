import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkerSpecialtys } from "@/domain/entities/Worker/WorkerSpecialtys";
import { Worker } from "@/domain/entities/Worker/Worker";
import { Machine } from "@/domain/entities/Machine/Machine";
import { PreventiveAction } from "@/domain/entities/PreventiveAction/PreventiveAction";
import { ServiceOrderTypes } from "@/domain/entities/ServiceOrder/ServiceOrderTypes";
import { Cause } from "../Cause/Cause";

@Entity()
export class ServiceOrder {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar', {nullable: true})
  weekCode?: string

  @Column('date')
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('int')
  durationInMinutes: number

  @Column('boolean')
  concluded: boolean

  @Column('nchar')
  type: ServiceOrderTypes

  @Column('nchar', {nullable: true})
  specialty?: WorkerSpecialtys

  @ManyToOne(() => Machine, (machine) => machine.serviceOrders)
  machine: Machine

  @ManyToOne(() => Cause, (cause) => cause.serviceOrders)
  cause: Cause

  @ManyToMany(() => Worker)
  @JoinColumn()
  responsibles?: Worker[]

  @OneToMany(() => PreventiveAction, (preventiveAction)=> preventiveAction.serviceOrder)
  preventiveActions?: PreventiveAction[]

  setWeekCode(value: string){
    this.weekCode = value
    return this
  }

  setDate(value: Date){
    this.date = value
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

  setSpecialty(value: WorkerSpecialtys){
    this.specialty = value
    return this
  }

}
