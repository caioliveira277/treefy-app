import { validateStrongPassword } from '@/validations/validations';
import { Alert } from 'react-native';
import { ChangePasswordViewModel } from './change-password-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class ChangePasswordViewModelImpl
  extends BaseViewModelImpl
  implements ChangePasswordViewModel
{
  passwordValue: string;

  confirmPasswordValue: string;

  constructor() {
    super();
    this.passwordValue = '';
    this.confirmPasswordValue = '';
  }

  public handlePasswordInputChange(value: string): void {
    this.passwordValue = value;
    this.notifyViewAboutChanges();
  }

  public handleConfirmPasswordInputChange(value: string): void {
    this.confirmPasswordValue = value;
    this.notifyViewAboutChanges();
  }

  handleSubmit(): void {
    const passwordValid = validateStrongPassword(this.passwordValue);

    if (!(this.passwordValue === this.confirmPasswordValue) || !passwordValid) {
      Alert.alert('Ops!', 'Invalid fields');
    } else {
      this.baseView?.props.navigation.navigate('Public', { screen: 'Access' });
    }
  }
}
