import { FieldValidation } from '@/validations/protocols/field-validation';
import { EmailValidator } from '../email/email-validator';
import { RequiredValidator } from '../required/required-validator';

export class BuilderValidator {
  private readonly fieldName: string;

  private readonly validations: FieldValidation[];

  private constructor(fieldName: string, validations: FieldValidation[]) {
    this.fieldName = fieldName;
    this.validations = validations;
  }

  static field(fieldName: string): BuilderValidator {
    return new BuilderValidator(fieldName, []);
  }

  public required(): BuilderValidator {
    this.validations.push(new RequiredValidator(this.fieldName));
    return this;
  }

  public email(): BuilderValidator {
    this.validations.push(new EmailValidator(this.fieldName));
    return this;
  }

  public build(): FieldValidation[] {
    return this.validations;
  }
}
