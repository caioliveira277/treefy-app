export type ValidateFunction = (value: string) => boolean;

export const validateEmail: ValidateFunction = (value) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(value);
};

export const validateStrongPassword: ValidateFunction = (value: string) => {
  const regexUppercaseLetters = /[A-Z]/g;
  const regexLowcaseLetters = /[a-z]/g;
  const regexNumbers = /[0-9]/g;

  return (
    regexUppercaseLetters.test(value) &&
    regexLowcaseLetters.test(value) &&
    regexNumbers.test(value) &&
    value.length > 5
  );
};

export const validateCompleteName: ValidateFunction = (value: string) => {
  const parts = value.split(' ');

  return parts.length >= 2;
};

export const validateConfirmationCode: ValidateFunction = (value: string) => {
  return value.length > 4;
};
