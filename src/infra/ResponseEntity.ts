import { IResponseEntity } from "@/domain/interfaces/IResponseEntity";

export class ResponseEntity<T> implements IResponseEntity<T> {
  message? = '';
  error = false;
  data?: T;

  private temp_data: {
    message?: string;
    error: boolean;
  }

  setMessage(value: string){
    this.temp_data.message = value
    return this
  }

  setError(value: boolean){
    this.temp_data.error = value
    return this
  }

  setData(value: T){
    this.data = value
    return this
  }

  build(){
    this.error = this.temp_data.error
    this.message = this.temp_data.message

    if(this.error){
      console.log('error : ' + this.message)
    }

    if(!this.error){
      console.log('log : ' + this.message)
    }

    return this
  }

}
