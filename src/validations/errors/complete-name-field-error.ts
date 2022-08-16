export class CompleteNameFieldError extends Error {
  constructor() {
    super('O nome e sobrenome deve ser informado');
    this.name = 'CompleteNameFieldError';
  }
}
