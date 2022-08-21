import { CompositeValidator } from './composite-validator';
import {
  RequiredValidator,
  EmailValidator,
  ContainsNumberValidator,
} from '@/validations/validators';
import faker from '@faker-js/faker';
import { FieldValidation } from '@/validations/protocols/field-validation';

interface MakeSut {
  (params: { validations: FieldValidation[] }): { sut: CompositeValidator };
}

const makeSut: MakeSut = ({ validations }) => {
  const sut = CompositeValidator.build(validations);
  return { sut };
};

describe('CompositeValidator', () => {
  test('Should not return error message', () => {
    const field = faker.database.column();
    const object = {
      [field]: faker.internet.email(),
    };
    const { sut } = makeSut({
      validations: [new RequiredValidator(field), new EmailValidator(field)],
    });

    expect(sut.validate(field, object)).toEqual('');
  });

  test('Should return a error message', () => {
    const field = faker.database.column();
    const object = {
      [field]: faker.datatype.string(),
    };
    const { sut } = makeSut({
      validations: [new RequiredValidator(field), new EmailValidator(field)],
    });
    expect(sut.validate(field, object)).not.toEqual('');
  });

  test('Should run all validations successfully', () => {
    const fieldOne = faker.database.column();
    const fieldTwo = faker.database.column();
    const object = {
      [fieldOne]: faker.internet.email(),
      [fieldTwo]: faker.datatype.number(),
    };
    const { sut } = makeSut({
      validations: [
        new RequiredValidator(fieldOne),
        new EmailValidator(fieldOne),
        new RequiredValidator(fieldTwo),
        new ContainsNumberValidator(fieldTwo),
      ],
    });
    console.log(object);

    expect(sut.validateAll([fieldOne, fieldTwo], object).hasError).toBeFalsy();
  });

  test('Should run all validations with error', () => {
    const fieldOne = faker.database.column();
    const fieldTwo = faker.database.column();
    const object = {
      [fieldOne]: faker.internet.email(),
      [fieldTwo]: '',
    };
    const { sut } = makeSut({
      validations: [
        new RequiredValidator(fieldOne),
        new EmailValidator(fieldOne),
        new RequiredValidator(fieldTwo),
        new ContainsNumberValidator(fieldTwo),
      ],
    });

    expect(sut.validateAll([fieldOne, fieldTwo], object).hasError).toBeTruthy();
    expect(
      sut.validateAll([fieldOne, fieldTwo], object).errors[fieldTwo]
    ).not.toEqual('');
  });
});
