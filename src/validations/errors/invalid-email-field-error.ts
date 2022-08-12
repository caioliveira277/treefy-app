export class InvalidEmailFieldError extends Error {
  constructor() {
    super('Email inválido');
    this.name = 'InvalidEmailFieldError';
  }
}
