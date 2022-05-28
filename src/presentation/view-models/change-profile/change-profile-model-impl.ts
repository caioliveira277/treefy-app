import { BaseViewModelImpl } from '../base-view-model-impl';
import { ChangeProfileViewModel } from './change-profile-model';
import {
  validateEmail,
  validateStrongPassword,
  validateCompleteName,
} from '@/validations/validations';
import { Alert } from 'react-native';

export class ChangeProfileModelImpl
  extends BaseViewModelImpl
  implements ChangeProfileViewModel
{
  public completeNameValue: string;

  public emailValue: string;

  public passwordValue: string;

  public confirmPasswordValue: string;

  constructor() {
    super();
    this.completeNameValue = '';
    this.emailValue = '';
    this.passwordValue = '';
    this.confirmPasswordValue = '';
  }

  handleCompleteNameInputChange(value: string): void {
    this.completeNameValue = value;
    this.notifyViewAboutChanges();
  }

  handleEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  handlePasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  handleConfirmPasswordInputChange(value: string): void {
    this.confirmPasswordValue = value;
    this.notifyViewAboutChanges();
  }

  public handleSubmit(): void {
    const completeNameValid = validateCompleteName(this.completeNameValue);
    const emailValid = validateEmail(this.emailValue);
    const passwordValid = validateStrongPassword(this.passwordValue);
    const confirmPasswordValid =
      this.passwordValue === this.confirmPasswordValue;

    if (
      !completeNameValid ||
      !emailValid ||
      !passwordValid ||
      !confirmPasswordValid
    ) {
      Alert.alert('Ops!', 'Invalid fields');
    }
  }
}
