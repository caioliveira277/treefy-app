import {
  validateEmail,
  validateStrongPassword,
} from '@/validations/validations';
import { AuthenticationViewModel } from './authentication-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';
import { Alert } from 'react-native';

export class AuthenticationViewModelImpl
  extends BaseViewModelImpl
  implements AuthenticationViewModel
{
  public readonly authentication: Authentication;

  public emailValue: string;

  public passwordValue: string;

  constructor(authentication: Authentication) {
    super();
    this.emailValue = '';
    this.passwordValue = '';
    this.authentication = authentication;
  }

  public handleEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  public handlePasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  public async handleMoveToForgotPassword(): Promise<void> {
    this.baseView?.props.navigation.navigate('Public', {
      screen: 'EmailConfirmation',
    });
  }

  public async handleSubmit(): Promise<void> {
    const emailValid = validateEmail(this.emailValue);
    const passwordValid = validateStrongPassword(this.passwordValue);

    if (!emailValid || !passwordValid) {
      Alert.alert('Ops!', 'Invalid fields');
    } else {
      const auth = await this.authentication.auth({
        email: this.emailValue,
        password: this.passwordValue,
      });
      if (auth.clientId) {
        this.baseView?.props.navigation.navigate('Main', {
          screen: 'HomeGroup',
          params: {
            screen: 'Home',
          },
        });
      } else {
        Alert.alert('Authentication failed');
      }
    }
  }
}
