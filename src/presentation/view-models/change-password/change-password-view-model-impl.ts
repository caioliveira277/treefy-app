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

  public formErrors = { password: '', confirmPassword: '' };

  public isLoading = false;

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

  public handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
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

    this.handleChangeLoadingState(true);

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
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Oops! Erro ao alterar senha',
        'Tivemos um problema com a alteração da sua senha, tente novamente mais tarde',
        'error'
      );
    }
    this.handleChangeLoadingState(false);
  }
}
