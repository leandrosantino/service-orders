import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '@/domain/User/User'
import { WorkerSpecialtys } from './WorkerSpecialtys'
import { ObjectUtils } from '@/utils/ObjectUtils'

@Entity()
export class Worker {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    userData: User

    @Column('nchar')
    specialty: WorkerSpecialtys

    setSpecialty(value: WorkerSpecialtys) {
        this.specialty = value
        return this
    }


    setUserData(value: User){
        this.userData = value
        return this
    }

    getSpecialty(){return this.specialty}
    getId(){return this.id}


    static getWorkerSpecialtyValues(){
        const specialtys = ObjectUtils.listNoNumberProperties(WorkerSpecialtys)
        return specialtys
    }

}
