import { BaseViewModel } from '../base-view-model';

export interface AuthenticationViewModel extends BaseViewModel {
  emailValue: string;
  passwordValue: string;

  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleSubmit(): void;
}
