import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('pending_preventive_service_order')
export class PendingPreventiveServiceOrder{

  @PrimaryGeneratedColumn({type: 'int', name: 'id'})
  id: number




}
