import { ValueTransformer } from 'typeorm';
import { DateTime } from './DateTime';

export class DateTransformer implements ValueTransformer {

  from(value: string): Date {
    return new DateTime(value);
  }

  to(value: Date): string {
    return value.toISOString();
  }

}
