import { BaseViewModelImpl } from '../base-view-model-impl';
import { SignupViewModel } from './signup-view-model';
import {
  validateEmail,
  validateStrongPassword,
  validateCompleteName,
} from '@/validations/validations';
import { Alert } from 'react-native';
import { Signup } from '@/domain/usecases';

import { TempUser } from '@/temp/user';

export class SignupViewModelImpl
  extends BaseViewModelImpl
  implements SignupViewModel
{
  public signup: Signup;

  public completeNameValue: string;

  public emailValue: string;

  public passwordValue: string;

  public confirmPasswordValue: string;

  constructor(signup: Signup) {
    super();
    this.signup = signup;
    this.completeNameValue = TempUser.completeName;
    this.emailValue = '';
    this.passwordValue = TempUser.password;
    this.confirmPasswordValue = TempUser.password;
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
      return Alert.alert('Ops!', 'Invalid fields');
    }

    const signup = await this.signup.signup({
      email: this.emailValue,
      password: this.passwordValue,
      name: this.completeNameValue,
    });

    if (signup) {
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'CodeConfirmation',
        params: {
          email: this.emailValue,
          password: this.passwordValue,
          flow: 'Signup',
        },
      });
    } else {
      Alert.alert('Error!', 'failed to register');
    }
  }
}
