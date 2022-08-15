import { ContainsNumberFieldError } from '@/validations/errors';
import { ContainsNumberValidator } from './number-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: ContainsNumberValidator };
}

const makeSut: MakeSut = ({ field }) => ({
  sut: new ContainsNumberValidator(field),
});

describe('ContainsNumberValidator', () => {
  test('Should return error if string does not contain number', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.random.alpha(),
    });
    expect(error).toEqual(new ContainsNumberFieldError());
  });

  test('Should return falsy if string contains number', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.datatype.number(),
    });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if name is empty', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: '',
    });
    expect(error).toBeFalsy();
  });
});
