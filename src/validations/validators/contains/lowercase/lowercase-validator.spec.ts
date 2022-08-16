import { ContainsLowercaseFieldError } from '@/validations/errors';
import { ContainsLowercaseValidator } from './lowercase-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: ContainsLowercaseValidator };
}

const makeSut: MakeSut = ({ field }) => ({
  sut: new ContainsLowercaseValidator(field),
});

describe('ContainsLowercaseValidator', () => {
  test('Should return error if string does not contain lowercase letter ', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.datatype.string().toUpperCase(),
    });
    expect(error).toEqual(new ContainsLowercaseFieldError());
  });

  test('Should return falsy if string contains lowercase letter', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.random.alpha({ count: 10, upcase: false }),
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
