import { Alert } from 'react-native';
import { ChangePasswordViewModel } from './change-password-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export class ChangePasswordViewModelImpl
  extends BaseViewModelImpl
  implements ChangePasswordViewModel
{
  public readonly validation: Validation;

  public readonly authentication: Authentication;

  public form = { password: '', confirmPassword: '' };

  public formErrors = this.form;

  constructor(authentication: Authentication, validation: Validation) {
    super();
    this.authentication = authentication;
    this.validation = validation;
  }

  public handlePasswordInputChange(value: string): void {
    this.form.password = value;
    this.formErrors.password = this.validation.validate('password', this.form);
    this.notifyViewAboutChanges();
  }

  public handleConfirmPasswordInputChange(value: string): void {
    this.form.confirmPassword = value;
    this.formErrors.confirmPassword = this.validation.validate(
      'confirmPassword',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const validation = this.validation.validateAll(
      ['password', 'passwordConfirmation'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors =
        validation.errors as ChangePasswordViewModel['formErrors'];
      this.notifyViewAboutChanges();
      return;
    }

    const params = this.baseView?.props.route
      .params as StackParamList['ChangePassword'];

    const passwordChanged = await this.authentication.changePassword({
      email: params.email,
      newPassword: this.form.password,
      code: params.code,
    });

    if (passwordChanged) {
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'Authentication',
      });
    } else {
      Alert.alert('Failed to change password');
    }
  }
}
