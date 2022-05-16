import { BaseViewModel } from '../base-view-model';

export interface SignupViewModel extends BaseViewModel {
  completeNameValue: string;

  emailValue: string;

  passwordValue: string;

  confirmPasswordValue: string;

  handleCompleteNameInputChange(value: string): void;
  handleEmailInputChange(value: string): void;
  handlePasswordInputChange(value: string): void;
  handleConfirmPasswordInputChange(value: string): void;
  handleSubmit(): void;
}
