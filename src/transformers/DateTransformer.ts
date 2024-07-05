import { ValueTransformer } from 'typeorm';
import { DateTime } from '../utils/DateTime';

export class DateTransformer implements ValueTransformer {

  dateType: 'date' | 'datetime' = 'datetime'

  constructor(type: 'date' | 'datetime'){
    this.dateType = type
  }

  from(value: string): Date {
    return new DateTime(value);
  }

  to(value: Date): string {
    if(this.dateType = 'date'){
      return value.toISOString().split('T')[0];
    }
    return value.toISOString().replace('T', ' ').replace('Z', '');
  }

}
