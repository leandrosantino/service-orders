export class DateTime extends Date{

  private MILISECONDS_IN_ONE_DAY :number
  private MILISECONDS_IN_ONE_SECOND :number

  constructor(...args:number[]) {
    super(...args as []);
    this.MILISECONDS_IN_ONE_SECOND = 1000
    this.MILISECONDS_IN_ONE_DAY = this.MILISECONDS_IN_ONE_SECOND * 60 * 60 * 24
  }

  plusDay(days: number) {
    const daysInMiliseconds = days * this.MILISECONDS_IN_ONE_DAY
    this.setMilliseconds(daysInMiliseconds)
    return this
  }

  isBefore(date: DateTime){
    return this.valueOf() < date.valueOf()
  }

  isAfter(date: DateTime){
    return this.valueOf() > date.valueOf()
  }

  toDateNumber(){
    return Math.floor(this.valueOf() / this.MILISECONDS_IN_ONE_SECOND)
  }

  fromDateNumber(dateNumber: number){
    return new DateTime(dateNumber * this.MILISECONDS_IN_ONE_SECOND)
  }

}
