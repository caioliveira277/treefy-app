import { RequiredFieldError } from '@/validations/errors';
import { RequiredValidator } from './required-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: RequiredValidator };
}

const makeSut: MakeSut = ({ field }) => ({
  sut: new RequiredValidator(field),
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
