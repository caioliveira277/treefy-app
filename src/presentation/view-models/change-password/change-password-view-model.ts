import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface ChangePasswordViewModel extends BaseViewModel {
  validation: Validation;
  authentication: Authentication;

  form: { password: string; confirmPassword: string };
  formErrors: ChangePasswordViewModel['form'];
  isLoading: boolean;

  handlePasswordInputChange(value: string): void;
  handleConfirmPasswordInputChange(value: string): void;
  handleChangeLoadingState(state: boolean): void;
  handleSubmit(): void;
}
