import { MinLengthFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class MinLengthValidator implements FieldValidation {
  public readonly field: string;

  private readonly minLength: number;

  constructor(field: string, minLength: number) {
    this.field = field;
    this.minLength = minLength;
  }

  public validate(object: Record<string, any>): Error | null {
    return !object[this.field] || object[this.field].length > this.minLength
      ? null
      : new MinLengthFieldError(this.minLength);
  }
}
