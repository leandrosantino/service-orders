import { User } from '@/domain/entities/User/User'
import { Specialty } from '@/domain/entities/Worker/Specialty'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ServiceOrder } from '../ServiceOrder/ServiceOrder'

@Entity({ name: 'worker' })
export class Worker {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column('nchar', { name: 'specialty' })
    specialty: Specialty

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    userData: User

    @ManyToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.responsibles)
    serviceOrders?: ServiceOrder[]

    setSpecialty(value: Specialty) {
        this.specialty = value
        return this
    }

    setUserData(value: User) {
        this.userData = value
        return this
    }

    public static getWorkerSpecialtyValues() {
        const specialtys = ObjectUtils.listNoNumberProperties(Specialty)
        return specialtys
    }

}
