import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { Technology } from "@/domain/entities/Technology/Technology";

@Entity()
export class Machine {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  tag: string

  @Column('nchar')
  ute: string

  @ManyToOne(() => Technology, (technology) => technology.machines)
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
