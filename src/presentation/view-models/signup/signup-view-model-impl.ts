import { BaseViewModelImpl } from '../base-view-model-impl';
import { SignupViewModel } from './signup-view-model';
import {
  validateEmail,
  validateStrongPassword,
  validateCompleteName,
} from '@/validations/validations';
import { Alert } from 'react-native';

export class SignupViewModelImpl
  extends BaseViewModelImpl
  implements SignupViewModel
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
