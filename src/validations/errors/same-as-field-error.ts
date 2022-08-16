export class SameAsFieldError extends Error {
  constructor(sameFieldLabel: string) {
    super(`O texto informado deve ser igual ao do campo "${sameFieldLabel}"`);
    this.name = 'SameAsFieldError';
  }
}
