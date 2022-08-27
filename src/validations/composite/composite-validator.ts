import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validations/protocols/field-validation';

export class CompositeValidator implements Validation {
  private readonly validator: FieldValidation[];

  private constructor(validator: FieldValidation[]) {
    this.validator = validator;
  }

  static build(validator: FieldValidation[]): CompositeValidator {
    return new CompositeValidator(validator);
  }

  public validate(fieldName: string, object: Record<string, any>): string {
    const validators = this.validator.filter((v) => v.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(object);
      if (error) {
        return error.message;
      }
    }
    return '';
  }

  public validateAll(fieldNames: string[], object: Record<string, any>) {
    const result: { errors: Record<string, string>; hasError: boolean } = {
      errors: {},
      hasError: false,
    };

    fieldNames.forEach((fieldName) => {
      result.errors[fieldName] = this.validate(fieldName, object);
      if (result.errors[fieldName]) result.hasError = true;
    });
    return result;
  }
}
