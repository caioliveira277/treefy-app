import { RequiredFieldError } from '@/validations/errors';
import { RequiredValidator } from './required-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string; fieldCondition?: string }): {
    sut: RequiredValidator;
  };
}

const makeSut: MakeSut = ({ field, fieldCondition }) => ({
  sut: new RequiredValidator(field, fieldCondition),
});

describe('RequiredValidator', () => {
  test('Should return error if string empty', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: '',
    });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if string is not empty', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.datatype.string(),
    });
    expect(error).toBeFalsy();
  });
});

describe('RequiredValiditor - conditional', () => {
  test('Should return falsy if string of field and condition field is not empty', () => {
    const field = faker.database.column();
    const fieldCondition = faker.database.column();
    const { sut } = makeSut({ field, fieldCondition });
    const error = sut.validate({
      [field]: faker.datatype.string(),
      [fieldCondition]: faker.datatype.string(),
    });
    expect(error).toBeFalsy();
  });

  test('Should return error if string of condition field is not empty and field is empty', () => {
    const field = faker.database.column();
    const fieldCondition = faker.database.column();
    const { sut } = makeSut({ field, fieldCondition });
    const error = sut.validate({
      [field]: '',
      [fieldCondition]: faker.datatype.string(),
    });
    expect(error).toEqual(new RequiredFieldError());
  });
});
