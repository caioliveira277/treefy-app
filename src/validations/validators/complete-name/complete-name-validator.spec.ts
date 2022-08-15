import { CompleteNameFieldError } from '@/validations/errors';
import { CompleteNameValidator } from './complete-name-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: CompleteNameValidator };
}

const makeSut: MakeSut = ({ field }) => ({
  sut: new CompleteNameValidator(field),
});

describe('CompleteNameValidator', () => {
  test('Should return error if name is not complete ', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.internet.userName(),
    });
    expect(error).toEqual(new CompleteNameFieldError());
  });

  test('Should return falsy if name is complete', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.finance.accountName(),
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
