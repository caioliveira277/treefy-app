import faker from '@faker-js/faker';
import {
  validateEmail,
  validateStrongPassword,
  validateCompleteName,
} from './validations';

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
    const anyPassword = 'Strong@Password2221';
    const { sut } = makeSut({ text: anyPassword });
    expect(sut()).toBeTruthy();
  });
  it('Should return false if password is not strong', () => {
    const anyPassword = faker.internet.password(4);
    const { sut } = makeSut({ text: anyPassword });
    expect(sut()).toBeFalsy();
  });
});

describe('Validation Complete Name', () => {
  const makeSut = ({ text }: MakeSutProps): SutTypes => {
    const sut = () => validateCompleteName(text);
    return {
      sut,
    };
  };

  it('Should return true if name is a complete name', () => {
    const anyNameComplete = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const { sut } = makeSut({ text: anyNameComplete });
    expect(sut()).toBeTruthy();
  });

  it('Should return false if name does not contain last name', () => {
    const anyName = faker.name.firstName();
    const { sut } = makeSut({ text: anyName });
    expect(sut()).toBeFalsy();
  });
});
