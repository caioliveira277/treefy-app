export type ValidateFunction = (text: string) => boolean;

export const validateEmail: ValidateFunction = (text) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(text);
};

export const validateStrongPassword: ValidateFunction = (text: string) => {
  const regexUppercaseLetters = /[A-Z]/g;
  const regexLowcaseLetters = /[a-z]/g;
  const regexNumbers = /[0-9]/g;

  return (
    regexUppercaseLetters.test(text) &&
    regexLowcaseLetters.test(text) &&
    regexNumbers.test(text) &&
    text.length > 5
  );
};
