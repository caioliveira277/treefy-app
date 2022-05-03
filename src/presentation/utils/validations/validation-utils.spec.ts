import faker from '@faker-js/faker';
import { validateEmail } from './validations-utils';

type SutTypes = {
  sut: () => boolean;
};
interface MakeSutProps {
  string: string;
}

const makeSut = ({ string }: MakeSutProps): SutTypes => {
  const sut = () => validateEmail(string);
  return {
    sut,
  };
};

describe('Validations', () => {
  it('Should return if email is valid', () => {
    const anyEmail = faker.internet.email();
    const { sut } = makeSut({ string: anyEmail });
    expect(sut()).toBeTruthy();
  });
  it('Should return if email is invalid', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({ string: anyText });
    expect(sut()).toBeFalsy();
  });
});
