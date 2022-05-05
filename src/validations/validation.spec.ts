import faker from '@faker-js/faker';
import { validateEmail, validateStrongPassword } from './validations';

type SutTypes = {
  sut: () => boolean;
};
interface MakeSutProps {
  text: string;
}

describe('Validation Email', () => {
  const makeSut = ({ text }: MakeSutProps): SutTypes => {
    const sut = () => validateEmail(text);
    return {
      sut,
    };
  };
  it('Should return true if email is valid', () => {
    const anyEmail = faker.internet.email();
    const { sut } = makeSut({ text: anyEmail });
    expect(sut()).toBeTruthy();
  });
  it('Should return false if email is invalid', () => {
    const anyText = faker.datatype.string();
    const { sut } = makeSut({ text: anyText });
    expect(sut()).toBeFalsy();
  });
});

describe('Validation Strong Password', () => {
  const makeSut = ({ text }: MakeSutProps): SutTypes => {
    const sut = () => validateStrongPassword(text);
    return {
      sut,
    };
  };
  it('Should return true if password is strong', () => {
    const anyPassword = faker.internet.password(
      9,
      false,
      /[A-Za-z]/,
      faker.internet.password(3, false, /[0-9]/)
    );
    const { sut } = makeSut({ text: anyPassword });
    expect(sut()).toBeTruthy();
  });
  it('Should return false if password is not strong', () => {
    const anyPassword = faker.internet.password(4);
    const { sut } = makeSut({ text: anyPassword });
    expect(sut()).toBeFalsy();
  });
});
