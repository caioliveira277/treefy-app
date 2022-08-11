import { validateConfirmationCode } from '@/validations/validations';
import { Alert } from 'react-native';
import { CodeConfirmationViewModel } from './code-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication, Signup } from '@/domain/usecases';

export class CodeConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements CodeConfirmationViewModel
{
  public signup: Signup;

  public authentication: Authentication;

  public codeValue: string;

  public constructor(signup: Signup, authentication: Authentication) {
    super();
    this.codeValue = '';
    this.signup = signup;
    this.authentication = authentication;
  }

  public handleCodeInputChange(value: string): void {
    this.codeValue = value;
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const codeValid = validateConfirmationCode(this.codeValue);
    const params = this.baseView?.props.route
      .params as StackParamList['CodeConfirmation'];

    if (!codeValid) {
      return Alert.alert('Ops!', 'Invalid code');
    }

    switch (params.flow) {
      case 'Signup':
        const confirmedCode = await this.signup.confirmByCode({
          email: params.email,
          code: this.codeValue,
        });
        if (!confirmedCode)
          return Alert.alert('Error!', 'failed to confirm code');

        Alert.alert('Success!', 'Account confimed successfully');
        await this.authentication.auth({
          email: params.email,
          password: params.password || '',
        });
        this.baseView?.props.navigation.navigate('Main', {
          screen: 'Home',
        });
        break;

      case 'ForgotPassword':
        this.baseView?.props.navigation.navigate('Public', {
          screen: 'ChangePassword',
          params: {
            email: params.email,
            code: this.codeValue,
          },
        });
        break;
    }
  }
}
