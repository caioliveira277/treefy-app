export class RequiredFieldError extends Error {
  constructor() {
    super('Esse campo precisa ser preenchido');
    this.name = 'RequiredFieldError';
  }
}
