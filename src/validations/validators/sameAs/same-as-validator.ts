import { SameAsFieldError } from '@/validations/errors';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class SameAsValidator implements FieldValidation {
  public readonly field: string;

  private readonly sameFieldName: string;

  private readonly sameFieldLabel: string;

  constructor(field: string, sameFieldName: string, sameFieldLabel: string) {
    this.field = field;
    this.sameFieldName = sameFieldName;
    this.sameFieldLabel = sameFieldLabel;
  }

  public validate(object: Record<string, any>): Error | null {
    return !object[this.field] ||
      object[this.field] === object[this.sameFieldName]
      ? null
      : new SameAsFieldError(this.sameFieldLabel);
  }
}
