import { CompleteNameFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class CompleteNameValidator implements FieldValidation {
  public readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  public validate(object: Record<string, any>): Error | null {
    const parts = object[this.field].split(' ');
    return !object[this.field] || parts.length >= 2
      ? null
      : new CompleteNameFieldError();
  }
}
