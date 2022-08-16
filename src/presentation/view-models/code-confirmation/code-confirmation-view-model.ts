import { Signup } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface CodeConfirmationViewModel extends BaseViewModel {
  validation: Validation;
  signup: Signup;

  form: { code: string };
  formErrors: CodeConfirmationViewModel['form'];

  handleCodeInputChange(value: string): void;
  handleSubmit(): void;
}
