import { Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { Machine } from "@/domain/entities/Machine/Machine";

@Entity({name: 'technology'})
export class Technology {

  @PrimaryColumn({type: 'nchar', name: 'id'})
  @Generated("uuid")
  id: number

  @Column('nchar', {name: 'description'})
  description: string

  @OneToMany(() => Machine, (machine) => machine.technology)
  machines: Machine[]

  setDescription(value: string) {
    this.description = value
    return this
  }

}
