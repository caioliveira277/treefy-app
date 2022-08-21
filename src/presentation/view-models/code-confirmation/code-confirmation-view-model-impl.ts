import { Alert } from 'react-native';
import { CodeConfirmationViewModel } from './code-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication, Signup } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export class CodeConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements CodeConfirmationViewModel
{
  public readonly validation: Validation;

  public readonly signup: Signup;

  public readonly authentication: Authentication;

  public form = { code: '' };

  public formErrors = { code: '' };

  public isLoading = false;

  public constructor(
    signup: Signup,
    authentication: Authentication,
    validation: Validation
  ) {
    super();
    this.signup = signup;
    this.authentication = authentication;
    this.validation = validation;
  }

  public handleCodeInputChange(value: string): void {
    this.form.code = value;
    this.formErrors.code = this.validation.validate('code', this.form);
    this.notifyViewAboutChanges();
  }

  public handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const validation = this.validation.validateAll(['code'], this.form);

    if (validation.hasError) {
      this.formErrors =
        validation.errors as CodeConfirmationViewModel['formErrors'];
      this.notifyViewAboutChanges();
      return;
    }

    const params = this.baseView?.props.route
      .params as StackParamList['CodeConfirmation'];

    switch (params.flow) {
      case 'Signup':
        this.handleChangeLoadingState(true);

        const codeConfirmed = await this.signup.confirmByCode({
          email: params.email,
          code: this.form.code,
        });

        if (!codeConfirmed) {
          Alert.alert('Error!', 'failed to confirm code');
          this.handleChangeLoadingState(false);
        } else {
          await this.authentication.auth({
            email: params.email,
            password: params.password || '',
          });
          this.baseView?.props.contextConsumer?.authentication.setIsAuthenticated(
            true
          );
          this.baseView?.props.navigation.navigate('Main', {
            screen: 'Home',
          });
          this.handleChangeLoadingState(false);
          Alert.alert('Success!', 'Account confimed successfully');
        }
        break;

      case 'ForgotPassword':
        this.baseView?.props.navigation.navigate('Public', {
          screen: 'ChangePassword',
          params: {
            email: params.email,
            code: this.form.code,
          },
        });
        break;
    }
  }
}
