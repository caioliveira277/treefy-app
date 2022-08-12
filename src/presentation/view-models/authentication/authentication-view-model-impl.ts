import { AuthenticationViewModel } from './authentication-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';
import { Alert } from 'react-native';
import { Validation } from '@/presentation/protocols/validation';

export class AuthenticationViewModelImpl
  extends BaseViewModelImpl
  implements AuthenticationViewModel
{
  public readonly validation: Validation;

  public readonly authentication: Authentication;

  public formErrors = { email: '', password: '' };

  public form = { email: '', password: '' };

  constructor(authentication: Authentication, validation: Validation) {
    super();
    this.authentication = authentication;
    this.validation = validation;
  }

  public handleEmailInputChange(value: string): void {
    this.form.email = value;
    this.formErrors.email = this.validation.validate('email', this.form);
    this.notifyViewAboutChanges();
  }

  public handlePasswordInputChange(value: string): void {
    this.form.password = value;
    this.formErrors.password = this.validation.validate('password', this.form);
    this.notifyViewAboutChanges();
  }

  public async handleMoveToForgotPassword(): Promise<void> {
    this.baseView?.props.navigation.navigate('Public', {
      screen: 'EmailConfirmation',
    });
  }

  public async handleSubmit(): Promise<void> {
    const validation = this.validation.validateAll(
      ['email', 'password'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors =
        validation.errors as AuthenticationViewModel['formErrors'];
      this.notifyViewAboutChanges();
    }

    const auth = await this.authentication.auth({
      email: this.form.email,
      password: this.form.password,
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
