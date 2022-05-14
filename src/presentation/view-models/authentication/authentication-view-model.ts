import { BaseViewModel } from '../base-view';

export interface AuthenticationViewModel extends BaseViewModel {
  emailValue: string;
  passwordValue: string;

  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleSubmit(): void;
}
