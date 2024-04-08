import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";

@Entity()
export class Cause {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  description: string

  @Column('nchar', {length: 1, unique: true})
  code: string

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.machine)
  serviceOrders?: ServiceOrder[]

  setDescription(value: string){
    this.description = value
    return this
  }

  setCode(value: string){
    if(value.length < 0){
      return new Error('size of the Cause code must be < 1')
    }
    this.code = value
    return this
  }

}
