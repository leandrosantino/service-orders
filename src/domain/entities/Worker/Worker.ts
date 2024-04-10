import { Column, Entity, Generated, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { User } from '@/domain/entities/User/User'
import { WorkerSpecialtys } from '@/domain/entities/Worker/WorkerSpecialtys'
import { ObjectUtils } from '@/utils/ObjectUtils'

@Entity({name: 'worker'})
export class Worker {

    @PrimaryColumn({type: 'nchar', name: 'id'})
    @Generated("uuid")
    id: string

    @OneToOne(() => User)
    @JoinColumn({name: 'user_data'})
    userData: User

    @Column('nchar', {name: 'specialty'})
    specialty: WorkerSpecialtys

    setSpecialty(value: WorkerSpecialtys) {
        this.specialty = value
        return this
    }


    setUserData(value: User){
        this.userData = value
        return this
    }

    static getWorkerSpecialtyValues(){
        const specialtys = ObjectUtils.listNoNumberProperties(WorkerSpecialtys)
        return specialtys
    }

}
