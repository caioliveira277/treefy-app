import { SameAsFieldError } from '@/validations/errors';
import { SameAsValidator } from './same-as-validator';
import faker from '@faker-js/faker';

interface MakeSut {
  (params: { field: string; sameFieldName: string; sameFieldLabel: string }): {
    sut: SameAsValidator;
  };
}

const makeSut: MakeSut = ({ field, sameFieldName, sameFieldLabel }) => ({
  sut: new SameAsValidator(field, sameFieldName, sameFieldLabel),
});

describe('SameAsValidator', () => {
  test('Should return error if fields are different', () => {
    const field = faker.database.column();
    const sameFieldName = `any_${faker.database.column()}`;
    const sameFieldLabel = faker.database.column();
    const { sut } = makeSut({
      field,
      sameFieldName,
      sameFieldLabel,
    });
    const error = sut.validate({
      [field]: faker.datatype.string(),
      [sameFieldName]: faker.datatype.number(),
    });
    expect(error).toEqual(new SameAsFieldError(sameFieldLabel));
  });

  test('Should return falsy if fields are the same', () => {
    const field = faker.database.column();
    const fieldValue = faker.datatype.string();
    const sameFieldName = `any_${faker.database.column()}`;
    const sameFieldLabel = faker.database.column();
    const { sut } = makeSut({
      field,
      sameFieldName,
      sameFieldLabel,
    });
    const error = sut.validate({
      [field]: fieldValue,
      [sameFieldName]: fieldValue,
    });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if field is empty', () => {
    const field = faker.database.column();
    const sameFieldName = faker.database.column();
    const sameFieldLabel = `any_${faker.database.column()}`;
    const { sut } = makeSut({
      field,
      sameFieldName,
      sameFieldLabel,
    });
    const error = sut.validate({
      [field]: '',
      [sameFieldName]: '',
    });
    expect(error).toBeFalsy();
  });
});
