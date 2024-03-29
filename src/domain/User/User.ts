import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UserRole } from "./UserRoules"
import { ObjectUtils } from "@/utils/ObjectUtils"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('nchar')
    firstName: string

    @Column('nchar')
    lastName: string

    @Column({type: 'int', unique: true})
    register: number

    @Column('nchar')
    password: string

    @Column('nchar')
    roule: UserRole


    setFirstName(value: string){
        this.firstName = value
        return this
    }

    setLastName(value: string){
        this.lastName = value
        return this
    }

    setRegister(value: number){
        this.register = value
        return this
    }

    setPassword(value: string){
        this.password = value
        return this
    }

    setRoule(value: UserRole){
        this.roule = value
        return this
    }

    static getUserRoleValues() {
        const roles = ObjectUtils.listNoNumberProperties(UserRole)
        return roles
    }

}
