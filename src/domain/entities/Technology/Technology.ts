import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "@/domain/entities/Machine/Machine";

@Entity()
export class Technology {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  description: string

  @OneToMany(() => Machine, (machine) => machine.technology)
  machines: Machine[]

  setDescription(value: string) {
    this.description = value
    return this
  }

}
