import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zone {

  @PrimaryGeneratedColumn()
  id: number

  @Column('nchar')
  slug: string

  setSlug(value: string){
    this.slug = value
    return this
  }

}
