export class ContainsLowercaseFieldError extends Error {
  constructor() {
    super('O campo deve conter ao menos uma letra minúscula');
    this.name = 'ContainsLowercaseFieldError';
  }
}
