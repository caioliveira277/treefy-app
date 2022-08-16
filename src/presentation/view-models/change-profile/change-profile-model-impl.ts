import { BaseViewModelImpl } from '../base-view-model-impl';
import { ChangeProfileViewModel } from './change-profile-model';
import { Alert } from 'react-native';

export class ChangeProfileModelImpl
  extends BaseViewModelImpl
  implements ChangeProfileViewModel
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
    Alert.alert('Ops!', 'Invalid fields');
  }
}
