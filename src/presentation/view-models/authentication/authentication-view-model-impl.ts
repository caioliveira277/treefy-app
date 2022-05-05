import {
  validateEmail,
  validateStrongPassword,
} from '@/validations/validations';
import { BaseView } from '@/presentation/views/base-view';
import { Alert } from 'react-native';
import { AuthenticationViewModel } from './authentication-view-model';

export class AuthenticationViewModelImpl implements AuthenticationViewModel {
  public emailValue: string;

  public passwordValue: string;

  private baseView?: BaseView;

  public constructor() {
    this.emailValue = '';
    this.passwordValue = '';
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public onEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  public onPasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  public onSubmit(): void {
    const emailValid = validateEmail(this.emailValue);
    const passwordValid = validateStrongPassword(this.passwordValue);

    if (!emailValid || !passwordValid) {
      Alert.alert('Ops!', 'Invalid fields');
    }
  }

  private notifyViewAboutChanges(): void {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  }
}
