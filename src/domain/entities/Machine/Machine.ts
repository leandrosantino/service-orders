import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceOrder } from "@/domain/entities/ServiceOrder/ServiceOrder";
import { Zone } from "./Zone";
import { ObjectUtils } from "@/utils/ObjectUtils";

@Entity({name: 'machine'})
export class Machine {

  @PrimaryGeneratedColumn({name: 'id'})
  id: number

  @Column('nchar', {name: 'tag', unique: true})
  tag: string

  @Column('nchar', {name: 'ute'})
  ute: Zone

  @Column('nchar', {name: 'technology'})
  technology: string

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.machine)
  serviceOrders?: ServiceOrder[]

  setTag(value: string) {
    this.tag = value
    return this
  }
  setUte(value: Zone) {
    this.ute = value
    return this
  }
  setTechnology(value: string) {
    this.technology = value
    return this
  }

  public static getZoneValues(){
    return ObjectUtils.listNoNumberProperties(Zone)
  }

}
