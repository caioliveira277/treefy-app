import {
  RequiredValidator,
  EmailValidator,
  MinLengthValidator,
  CompleteNameValidator,
  SameAsValidator,
  ContainsLowercaseValidator,
  ContainsNumberValidator,
  ContainsUppercaseValidator,
} from '@/validations/validators';
import { BuilderValidator as sut } from './builder-validator';
import faker from '@faker-js/faker';

describe('BuilderValidator', () => {
  test('Should return RequiredValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).required().build();
    expect(validation).toEqual([new RequiredValidator(field)]);
  });

  test('Should return EmailValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).email().build();
    expect(validation).toEqual([new EmailValidator(field)]);
  });

  test('Should return MinLengthValidator', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validation = sut.field(field).minLength(length).build();
    expect(validation).toEqual([new MinLengthValidator(field, length)]);
  });

  test('Should return CompleteNameValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).completeName().build();
    expect(validation).toEqual([new CompleteNameValidator(field)]);
  });

  test('Should return SameAsValidator', () => {
    const field = faker.database.column();
    const sameFieldName = `any_${faker.database.column()}`;
    const sameFieldLabel = faker.database.column();
    const validation = sut
      .field(field)
      .sameAs(sameFieldName, sameFieldLabel)
      .build();
    expect(validation).toEqual([
      new SameAsValidator(field, sameFieldName, sameFieldLabel),
    ]);
  });

  test('Should return ContainsLowercaseValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).containsLowercase().build();
    expect(validation).toEqual([new ContainsLowercaseValidator(field)]);
  });

  test('Should return ContainsNumberValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).containsNumber().build();
    expect(validation).toEqual([new ContainsNumberValidator(field)]);
  });

  test('Should return ContainsUppercaseValidator', () => {
    const field = faker.database.column();
    const validation = sut.field(field).containsUppercase().build();
    expect(validation).toEqual([new ContainsUppercaseValidator(field)]);
  });

  test('Should return a validation list', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validation = sut
      .field(field)
      .required()
      .minLength(length)
      .email()
      .build();
    expect(validation).toEqual([
      new RequiredValidator(field),
      new MinLengthValidator(field, length),
      new EmailValidator(field),
    ]);
  });
});
