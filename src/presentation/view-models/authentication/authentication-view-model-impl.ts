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

  public form = { email: '', password: '' };

  public formErrors = { email: '', password: '' };

  public isLoading = false;

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

  public handleMoveToForgotPassword(): void {
    this.baseView?.props.navigation.navigate('Public', {
      screen: 'EmailConfirmation',
    });
  }

  public handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
    this.notifyViewAboutChanges();
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
      return;
    }

    this.handleChangeLoadingState(true);

    const auth = await this.authentication.auth({
      email: this.form.email,
      password: this.form.password,
    });
    if (auth.clientId) {
      this.baseView?.props.contextConsumer?.authentication.setIsAuthenticated(
        true
      );
    } else {
      Alert.alert('Error!', 'Authentication failure');
    }
    this.handleChangeLoadingState(false);
  }
}
