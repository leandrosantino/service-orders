import { User } from '@/domain/entities/User/User'
import { Specialty } from '@/domain/entities/Worker/Specialty'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'worker' })
export class Worker {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_data' })
    userData: User

    @Column('nchar', { name: 'specialty' })
    specialty: Specialty

    setSpecialty(value: Specialty) {
        this.specialty = value
        return this
    }

    setUserData(value: User) {
        this.userData = value
        return this
    }

    static getWorkerSpecialtyValues() {
        const specialtys = ObjectUtils.listNoNumberProperties(Specialty)
        return specialtys
    }

}
