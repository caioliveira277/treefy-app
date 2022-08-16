import { BaseViewModel } from '../base-view-model';
import { Signup } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export interface SignupViewModel extends BaseViewModel {
  validation: Validation;
  signup: Signup;

  form: {
    completeName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  formErrors: SignupViewModel['form'];
  isLoading: boolean;

  handleCompleteNameInputChange(value: string): void;
  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleConfirmPasswordInputChange(value: string): void;
  handleChangeLoadingState(state: boolean): void;
  handleSubmit(): void;
}
