import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface AuthenticationViewModel extends BaseViewModel {
  validation: Validation;
  authentication: Authentication;
  form: {
    email: string;
    password: string;
  };
  formErrors: AuthenticationViewModel['form'];
  isLoading: boolean;

  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleMoveToForgotPassword(): void;
  handleChangeLoadingState(state: boolean): void;
  handleSubmit(): void;
}
