import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";

@Entity({name: 'cause'})
export class Cause {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column('nchar', {name: 'description'})
  description: string

  @Column('nchar', {length: 1, unique: true, name: 'code'})
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
