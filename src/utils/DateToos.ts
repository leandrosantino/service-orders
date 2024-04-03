import {getWeek} from 'date-fns'

export class DateTime extends Date {

  private MILISECONDS_IN_ONE_SECOND :number
  weekOfYearPattern = new RegExp(/\d{4}-W\d{2}/)

  constructor(...args:number[]) {
    super(...args as []);
    this.MILISECONDS_IN_ONE_SECOND = 1000
  }

  fromWeekOfYearString(weekOfYearString: string){
    if(!this.weekOfYearPattern.test(weekOfYearString)){
        throw new Error('String week not compatible with the pattern!')
    }
    const week = Number(weekOfYearString.split('-W')[1])
    const year = Number( weekOfYearString.split('-W')[0])
    const day = (1 + (week - 2) * 7) + 6
    return new DateTime(year, 0, day)
  }

  getWeekOfYear(){
    return getWeek(this)
  }

  toWeekOfYearString(){
    return `${this.getFullYear()}-W${getWeek(this)}`
  }

  plusDay(days: number) {
    this.setDate(this.getDate() + days)
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

  plusWeek(weeks: number) {
    this.setDate(this.getDate() + (7 * weeks))
    return this
  }

}
