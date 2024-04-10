import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { Technology } from "@/domain/entities/Technology/Technology";

@Entity({name: 'machine'})
export class Machine {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column('nchar', {name: 'tag'})
  tag: string

  //Mudar para um relacionamento com a entidade Zone
  @Column('nchar', {name: 'ute'})
  ute: string

  @ManyToOne(() => Technology, (technology) => technology.machines)
  @JoinColumn({name: 'technology'})
  technology: Technology

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.machine)
  serviceOrders?: ServiceOrder[]


  setTag(value: string) {
    this.tag = value
    return this
  }
  setUte(value: string) {
    this.ute = value
    return this
  }
  setTechnology(value: Technology) {
    this.technology = value
    return this
  }


}
