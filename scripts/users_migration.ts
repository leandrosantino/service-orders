import { database } from "../src/infra/database"
import { servicesFactory } from "../src/infra/factories/servicesFactory"
import workers from './4 - worker.json'
import { User } from "../src/domain/entities/User/User"
import { UserRole } from "../src/domain/entities/User/UserRoules"
import { Worker } from "../src/domain/entities/Worker/Worker"
import { Specialty } from "../src/domain/entities/Worker/Specialty"

(async () => {
  await database.initialize()
  const services = servicesFactory()

  try{

    const user = new User()
        .setFirstName('Leandro')
        .setLastName('Santino')
        .setRegister(913)
        .setPassword('LEA@adler')
        .setRoule(UserRole.ADMIN)
    await services.userService.create(user)

    for await (let item of workers){
      const user = new User()
        .setFirstName(item.name)
        .setLastName('')
        .setRegister(item.registration)
        .setPassword(item.name+'@'+item.registration)
        .setRoule(UserRole.WORKER)

      const createdUser = await services.userService.create(user)

      const worker = new Worker()
        .setSpecialty(item.class as Specialty)
        .setUserData(createdUser)

      await services.userService.createWorker(worker)

    }

  }catch(e){
    console.log((e as Error).message)
  }
})()
