import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { UserRole } from "@/domain/entities/User/UserRoules"
import { ObjectUtils } from "@/utils/ObjectUtils"


@Entity({name: 'user'})
export class User {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column('nchar', {name: 'first_name'})
    firstName: string

    @Column('nchar', {name: 'last_name'})
    lastName: string

    @Column('int', {unique: true, name: 'register'})
    register: number

    @Column('nchar', {name: 'password'})
    password: string

    @Column('nchar', {name: 'role'})
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
