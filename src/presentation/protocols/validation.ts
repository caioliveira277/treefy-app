export interface Validation {
  validate: (fieldName: string, object: Record<string, any>) => string;
  validateAll: (
    fieldNames: string[],
    object: Record<string, string>
  ) => { errors: Record<string, string>; hasError: boolean };
}
