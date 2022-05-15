import { validateEmail } from '@/validations/validations';
import { Alert } from 'react-native';
import { EmailConfirmationViewModel } from './email-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class EmailConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements EmailConfirmationViewModel
{
  public emailValue: string;

  public constructor() {
    super();
    this.emailValue = '';
  }

  public handleEmailInputChange(value: string): void {
    this.emailValue = value;
    this.notifyViewAboutChanges();
  }

  public handleSubmit(): void {
    const emailValid = validateEmail(this.emailValue);

    if (!emailValid) {
      Alert.alert('Ops!', 'Invalid fields');
    }
  }
}
