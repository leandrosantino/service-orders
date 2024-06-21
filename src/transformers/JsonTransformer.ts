import { ValueTransformer } from 'typeorm';
import { ZodSchema } from 'zod';

export class JsonTransformer<T> implements ValueTransformer {

  private schema: ZodSchema

  constructor(schema: ZodSchema){
    this.schema = schema
  }

  from(value: string): T {
    try {
      const actions = this.schema.parse(JSON.parse(value))
      return actions as T
    } catch {
      return null
    }
  }

  to(value: Date): string {
    return JSON.stringify(value)
  }

}
