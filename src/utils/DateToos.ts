import {getWeek} from 'date-fns'

export class DateTime extends Date{

  private MILISECONDS_IN_ONE_DAY :number
  private MILISECONDS_IN_ONE_SECOND :number
  weekOfYearPattern = new RegExp(/\d{4}-W\d{2}/)

  constructor(...args:number[]) {
    super(...args as []);
    this.MILISECONDS_IN_ONE_SECOND = 1000
    this.MILISECONDS_IN_ONE_DAY = this.MILISECONDS_IN_ONE_SECOND * 60 * 60 * 24
  }

  getWeekOfYear(){
    return getWeek(this)
  }

  getWeekOfYearString(){
    return `${this.getFullYear()}-W${getWeek(this)}`
  }

  plusDay(days: number) {
    const daysInMiliseconds = days * this.MILISECONDS_IN_ONE_DAY
    this.setMilliseconds(daysInMiliseconds)
    return this
  }

  plusMonth(months: number){
    this.setMonth(this.getMonth() + months)
    return this
  }

  plusYear(years: number){
    this.setFullYear(this.getFullYear() + years)
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
