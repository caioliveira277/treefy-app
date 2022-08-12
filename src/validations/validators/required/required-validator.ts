import { RequiredFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class RequiredValidator implements FieldValidation {
  public readonly field: string;

  constructor(field: string) {
    this.field = field;
  }

  public validate(object: Record<string, any>): Error | null {
    return !!object[this.field] === true ? null : new RequiredFieldError();
  }
}
