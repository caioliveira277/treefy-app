import { FieldValidation } from '@/validations/protocols/field-validation';
import {
  RequiredValidator,
  EmailValidator,
  CompleteNameValidator,
  ContainsLowercaseValidator,
  MinLengthValidator,
  ContainsNumberValidator,
  ContainsUppercaseValidator,
  SameAsValidator,
} from '@/validations/validators';

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

  public requiredIf(fieldNameCondition: string): BuilderValidator {
    this.validations.push(
      new RequiredValidator(this.fieldName, fieldNameCondition)
    );
    return this;
  }

  public email(): BuilderValidator {
    this.validations.push(new EmailValidator(this.fieldName));
    return this;
  }

  public completeName(): BuilderValidator {
    this.validations.push(new CompleteNameValidator(this.fieldName));
    return this;
  }

  public containsLowercase(): BuilderValidator {
    this.validations.push(new ContainsLowercaseValidator(this.fieldName));
    return this;
  }

  public minLength(minLength: number): BuilderValidator {
    this.validations.push(new MinLengthValidator(this.fieldName, minLength));
    return this;
  }

  public containsNumber(): BuilderValidator {
    this.validations.push(new ContainsNumberValidator(this.fieldName));
    return this;
  }

  public containsUppercase(): BuilderValidator {
    this.validations.push(new ContainsUppercaseValidator(this.fieldName));
    return this;
  }

  public sameAs(
    sameFieldName: string,
    sameFieldLabel: string
  ): BuilderValidator {
    this.validations.push(
      new SameAsValidator(this.fieldName, sameFieldName, sameFieldLabel)
    );
    return this;
  }

  public build(): FieldValidation[] {
    return this.validations;
  }
}
