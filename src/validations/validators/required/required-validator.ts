import { RequiredFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class RequiredValidator implements FieldValidation {
  public readonly field: string;

  private readonly fieldCondition: string;

  constructor(field: string, fieldCondition = '') {
    this.field = field;
    this.fieldCondition = fieldCondition;
  }

  public validate(object: Record<string, any>): Error | null {
    if (this.fieldCondition) {
      return object[this.fieldCondition]
        ? object[this.field]
          ? null
          : new RequiredFieldError()
        : null;
    } else {
      return !!object[this.field] ? null : new RequiredFieldError();
    }
  }
}
