import { ContainsUppercaseFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class ContainsUppercaseValidator implements FieldValidation {
  public readonly field: string;

  private readonly regex = /[A-Z]/;

  constructor(field: string) {
    this.field = field;
  }

  public validate(object: Record<string, any>): Error | null {
    return !object[this.field] || this.regex.test(object[this.field])
      ? null
      : new ContainsUppercaseFieldError();
  }
}
