export interface FieldValidation {
  field: string;
  validate: (object: Record<string, any>) => Error | null;
}
