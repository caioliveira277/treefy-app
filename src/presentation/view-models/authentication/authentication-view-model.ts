import { BaseViewModel } from '../base-view';

export interface AuthenticationViewModel extends BaseViewModel {
  emailValue: string;
  passwordValue: string;

  onEmailInputChange(value: string): void;
  onPasswordInputChange(value: string): void;
  onSubmit(): void;
}
