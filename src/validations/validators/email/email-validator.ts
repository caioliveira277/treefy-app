import { InvalidEmailFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class EmailValidator implements FieldValidation {
  public readonly field: string;

  private readonly regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(field: string) {
    this.field = field;
  }

  public validate(object: Record<string, any>): Error | null {
    return !object[this.field] || this.regex.test(object[this.field])
      ? null
      : new InvalidEmailFieldError();
  }
}
