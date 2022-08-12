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
  formErrors: {
    email: string;
    password: string;
  };

  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleMoveToForgotPassword(): void;
  handleSubmit(): void;
}
