export class EmailFieldError extends Error {
  constructor() {
    super('O email informado está inválido');
    this.name = 'EmailFieldError';
  }
}
