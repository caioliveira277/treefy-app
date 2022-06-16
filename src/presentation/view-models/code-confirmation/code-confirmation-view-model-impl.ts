import { validateConfirmationCode } from '@/validations/validations';
import { Alert } from 'react-native';
import { CodeConfirmationViewModel } from './code-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class CodeConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements CodeConfirmationViewModel
{
  public codeValue: string;

  public constructor() {
    super();
    this.codeValue = '';
  }

  public handleCodeInputChange(value: string): void {
    this.codeValue = value;
    this.notifyViewAboutChanges();
  }

  public handleSubmit(): void {
    const emailValid = validateConfirmationCode(this.codeValue);

    if (!emailValid) {
      Alert.alert('Ops!', 'Invalid code');
    } else {
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'Access',
      });
    }
  }
}
