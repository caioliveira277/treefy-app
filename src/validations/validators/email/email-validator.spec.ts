import { EmailFieldError } from '@/validations/errors';
import { EmailValidator } from './email-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: EmailValidator };
}

const makeSut: MakeSut = ({ field = '' }) => ({
  sut: new EmailValidator(field),
});

describe('EmailValidator', () => {
  test('Should return error if email is invalid', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toEqual(new EmailFieldError());
  });

  test('Should return falsy if email is valid', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({ [field]: faker.internet.email() });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if email is empty', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({ [field]: '' });
    expect(error).toBeFalsy();
  });
});
