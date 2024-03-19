import { userRepository } from "@/domain/User/UserRepository";
import { IpcChannel } from "@/utils/IpcUtils";


export class UserController {

  @IpcChannel()
  async getUsers(){
    const users = await userRepository.find()
    return users
  }

  @IpcChannel()
  async getUserById(id: number){
    try{
      const user = await userRepository.findOneBy({id})
      return user
    }catch{
      return null
    }
  }

}
