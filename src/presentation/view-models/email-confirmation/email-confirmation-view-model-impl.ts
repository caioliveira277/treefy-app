import { validateEmail } from '@/validations/validations';
import { Alert } from 'react-native';
import { EmailConfirmationViewModel } from './email-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';

export class EmailConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements EmailConfirmationViewModel
{
  public authentication: Authentication;

  public emailValue: string;

  public constructor(authentication: Authentication) {
    super();
    this.authentication = authentication;
    this.emailValue = '';
  }

  public handleEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const emailValid = validateEmail(this.emailValue);

    if (!emailValid) {
      Alert.alert('Ops!', 'Invalid fields');
    } else {
      await this.authentication.sendCodeToChangePassword({
        email: this.emailValue,
      });
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'CodeConfirmation',
        params: {
          email: this.emailValue,
          flow: 'ForgotPassword',
        },
      });
    }
  }
}
