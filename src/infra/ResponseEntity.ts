import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";

export class ResponseEntity<T> implements IResponseEntity<T> {
  message? = '';
  error = false;
  data?: T;

  falure(message: string){
    this.message = message
    this.error = true
    console.log('error : ' + this.message)
    return this
  }

  success(data:T){
    this.data = data
    this.error = false
    if(!this.data) {
      console.log('Success!!')
      return this
    }
    console.log(this.data)
    return this
  }

}
