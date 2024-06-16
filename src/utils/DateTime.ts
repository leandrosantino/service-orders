import {getWeek} from 'date-fns'

export class DateTime extends Date {

  weekOfYearPattern = new RegExp(/\d{4}-W\d{2}/)

  constructor(...args:Array<number | string>) {
    super(...args as [])
  }

  // fromDateObject(date: Date){
  //   Object.assign(this, date)
  //   return this
  // }

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
    let weekNumber = String(getWeek(this))
    weekNumber = weekNumber.length == 1? `0${weekNumber}`: weekNumber
    return `${this.getFullYear()}-W${weekNumber}`
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

  isBefore(date: Date){
    return this.valueOf() < date.valueOf()
  }

  isAfter(date: Date){
    return this.valueOf() > date.valueOf()
  }

  toDateNumber(){
    return this.valueOf()
  }

  fromDateNumber(dateNumber: number){
    return new DateTime(dateNumber)
  }

  plusWeek(weeks: number) {
    this.setDate(this.getDate() + (7 * weeks))
    return this
  }

}
