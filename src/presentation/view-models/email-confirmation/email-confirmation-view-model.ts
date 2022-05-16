import { BaseViewModel } from '../base-view-model';

export interface EmailConfirmationViewModel extends BaseViewModel {
  emailValue: string;

  handleEmailInputChange(value: string): void;
  handleSubmit(): void;
}
