import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name: 'zone'})
export class Zone {

  @PrimaryColumn({type: 'nchar', name: 'id'})
  @Generated("uuid")
  id: string

  @Column('nchar', {name: 'name'})
  name: string

  setSlug(value: string){
    this.name = value
    return this
  }

}
