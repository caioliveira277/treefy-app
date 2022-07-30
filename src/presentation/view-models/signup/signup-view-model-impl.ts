import { BaseViewModelImpl } from '../base-view-model-impl';
import { SignupViewModel } from './signup-view-model';
import {
  validateEmail,
  validateStrongPassword,
  validateCompleteName,
} from '@/validations/validations';
import { Alert } from 'react-native';
import { Auth } from 'aws-amplify';

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

  public async handleSubmit(): Promise<void> {
    const validCompleteName = validateCompleteName(this.completeNameValue);
    const validEmail = validateEmail(this.emailValue);
    const validPassword = validateStrongPassword(this.passwordValue);
    const validConfirmPassword =
      this.passwordValue === this.confirmPasswordValue;
    if (
      !validCompleteName ||
      !validEmail ||
      !validPassword ||
      !validConfirmPassword
    ) {
      Alert.alert('Ops!', 'Invalid fields');
    } else {
      await Auth.signUp({
        username: this.emailValue,
        password: this.passwordValue,
        attributes: {
          name: this.completeNameValue,
        },
      });
    }
  }
}
