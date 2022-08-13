export class ContainsUppercaseFieldError extends Error {
  constructor() {
    super('O campo deve conter ao menos uma letra maiúscula');
    this.name = 'ContainsUppercaseFieldError';
  }
}
