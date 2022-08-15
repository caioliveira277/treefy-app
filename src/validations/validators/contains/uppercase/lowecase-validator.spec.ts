import { ContainsUppercaseFieldError } from '@/validations/errors';
import { ContainsUppercaseValidator } from './uppercase-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string }): { sut: ContainsUppercaseValidator };
}

const makeSut: MakeSut = ({ field }) => ({
  sut: new ContainsUppercaseValidator(field),
});

describe('ContainsUppercaseValidator', () => {
  test('Should return error if string does not contain uppercase letter ', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.datatype.string().toLowerCase(),
    });
    expect(error).toEqual(new ContainsUppercaseFieldError());
  });

  test('Should return falsy if string contains uppercase letter', () => {
    const field = faker.database.column();
    const { sut } = makeSut({ field });
    const error = sut.validate({
      [field]: faker.name.findName(),
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
