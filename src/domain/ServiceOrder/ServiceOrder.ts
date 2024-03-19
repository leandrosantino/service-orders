import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkerSpecialtys } from "@/domain/Worker/WorkerSpecialtys";
import { Worker } from "@/domain/Worker/Worker";
import { Machine } from "@/domain/Machine/Machine";

@Entity()
export class ServiceOrder {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  weekCode?: string

  @Column('date')
  date: Date

  @Column('int')
  durationInMinutes: number

  @Column('boolean')
  concluded: boolean

  @Column('nchar')
  specialty: WorkerSpecialtys

  @ManyToOne(() => Machine, (machine) => machine.serviceOrders)
  machine: Machine

  @ManyToMany(() => Worker)
  @JoinTable()
  responsible: Worker[]


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
