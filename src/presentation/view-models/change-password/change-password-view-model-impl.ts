import { validateStrongPassword } from '@/validations/validations';
import { Alert } from 'react-native';
import { ChangePasswordViewModel } from './change-password-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';

export class ChangePasswordViewModelImpl
  extends BaseViewModelImpl
  implements ChangePasswordViewModel
{
  public authentication: Authentication;

  public passwordValue: string;

  public confirmPasswordValue: string;

  constructor(authentication: Authentication) {
    super();
    this.passwordValue = '';
    this.confirmPasswordValue = '';
    this.authentication = authentication;
  }

  public handlePasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  public handleConfirmPasswordInputChange(value: string): void {
    this.confirmPasswordValue = value;
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const passwordValid = validateStrongPassword(this.passwordValue);
    const params = this.baseView?.props.route
      .params as StackParamList['ChangePassword'];

    if (!(this.passwordValue === this.confirmPasswordValue) || !passwordValid) {
      Alert.alert('Ops!', 'Invalid fields');
    } else {
      await this.authentication.changePassword({
        email: params.email,
        newPassword: this.passwordValue,
        code: params.code,
      });
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'Authentication',
      });
    }
  }
}
