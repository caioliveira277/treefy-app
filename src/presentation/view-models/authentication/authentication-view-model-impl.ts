import {
  validateEmail,
  validateStrongPassword,
} from '@/validations/validations';
import { AuthenticationViewModel } from './authentication-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class AuthenticationViewModelImpl
  extends BaseViewModelImpl
  implements AuthenticationViewModel
{
  public emailValue: string;

  public passwordValue: string;

  public constructor() {
    super();
    this.emailValue = '';
    this.passwordValue = '';
  }

  public handleEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  public handlePasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  public handleMoveToEmailConfirmation(): void {
    this.baseView?.props.navigation.navigate('EmailConfirmation');
  }

  public handleSubmit(): void {
    const emailValid = validateEmail(this.emailValue);
    const passwordValid = validateStrongPassword(this.passwordValue);

    if (!emailValid || !passwordValid) {
      // TODO: add validation
    }
    this.baseView?.props.navigation.navigate('Home');
  }
}
