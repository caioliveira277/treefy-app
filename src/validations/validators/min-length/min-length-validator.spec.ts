import { MinLengthFieldError } from '@/validations/errors';
import { MinLengthValidator } from './min-length-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string; minLength: number }): { sut: MinLengthValidator };
}

const makeSut: MakeSut = ({ field, minLength }) => ({
  sut: new MinLengthValidator(field, minLength),
});

describe('MinLengthValidator', () => {
  test('Should return error if string is less than minLength param', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number({ min: 1, max: 150 });
    const { sut } = makeSut({ field, minLength });
    const error = sut.validate({
      [field]: faker.datatype.string(minLength - 2),
    });
    expect(error).toEqual(new MinLengthFieldError(minLength));
  });

  test('Should return falsy if string is greater than minLength param', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number({ min: 1, max: 150 });
    const { sut } = makeSut({ field, minLength });
    const error = sut.validate({
      [field]: faker.datatype.string(minLength + 2),
    });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if string is empty', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number({ min: 1, max: 150 });
    const { sut } = makeSut({ field, minLength });
    const error = sut.validate({
      [field]: '',
    });
    expect(error).toBeFalsy();
  });
});
