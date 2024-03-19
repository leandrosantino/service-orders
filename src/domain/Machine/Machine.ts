import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/ServiceOrder/ServiceOrder";

@Entity()
export class Machine {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  tag: string

  @Column('nchar')
  ute: string

  @Column('nchar')
  technology: string

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.machine)
  serviceOrders: ServiceOrder


  setTag(value: string) {
    this.tag = value
    return this
  }
  setUte(value: string) {
    this.ute = value
    return this
  }
  setTechnology(value: string) {
    this.technology = value
    return this
  }


}
