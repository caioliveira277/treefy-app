export interface Validation {
  validate: (fieldName: string, object: Record<string, any>) => string;
  validateAll: (
    fieldNames: string[],
    object: Record<string, any>
  ) => { errors: Record<string, any>; hasError: boolean };
}
