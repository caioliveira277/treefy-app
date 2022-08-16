export class ContainsNumberFieldError extends Error {
  constructor() {
    super('O campo deve conter ao menos um número');
    this.name = 'ContainsNumberFieldError';
  }
}
