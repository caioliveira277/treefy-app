import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface ChangeProfileViewModel extends BaseViewModel {
  authentication: Authentication;
  validation: Validation;

  form: {
    completeName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  formErrors: ChangeProfileViewModel['form'];

  isLoading: boolean;

  handleCompleteNameInputChange(value: string): void;
  handleCurrentPasswordInputChange(value: string): void;
  handleNewPasswordInputChange(value: string): void;
  handleConfirmNewPasswordInputChange(value: string): void;
  handleSubmit(): void;
}
