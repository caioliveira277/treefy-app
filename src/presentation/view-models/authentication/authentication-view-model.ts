import { Authentication } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface AuthenticationViewModel extends BaseViewModel {
  authentication: Authentication;
  emailValue: string;
  passwordValue: string;

  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleMoveToForgotPassword(): void;
  handleSubmit(): void;
}
