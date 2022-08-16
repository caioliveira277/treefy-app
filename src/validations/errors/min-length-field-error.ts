export class MinLengthFieldError extends Error {
  constructor(minLength: number) {
    super(`O campo deve ter mais de ${minLength} caracteres`);
    this.name = 'MinLengthFieldError';
  }
}
