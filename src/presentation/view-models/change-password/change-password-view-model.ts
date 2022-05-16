import { BaseViewModel } from '../base-view-model';

export interface ChangePasswordViewModel extends BaseViewModel {
  passwordValue: string;
  confirmPasswordValue: string;

  handlePasswordInputChange(value: string): void;
  handleConfirmPasswordInputChange(value: string): void;
  handleSubmit(): void;
}
