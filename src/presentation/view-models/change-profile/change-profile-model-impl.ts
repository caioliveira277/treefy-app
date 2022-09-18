import { BaseViewModelImpl } from '../base-view-model-impl';
import { ChangeProfileViewModel } from './change-profile-model';
import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export class ChangeProfileViewModelImpl
  extends BaseViewModelImpl
  implements ChangeProfileViewModel
{
  public authentication: Authentication;

  public validation: Validation;

  public form = {
    completeName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  public formErrors = {
    completeName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  public isLoading = false;

  constructor(authentication: Authentication, validation: Validation) {
    super();
    this.authentication = authentication;
    this.validation = validation;
  }

  public async handleGetUserData(): Promise<void> {
    const user = await this.authentication.getAuthenticatedUser();
    this.form = {
      ...this.form,
      completeName: user.name,
      email: user.email,
    };
    this.notifyViewAboutChanges();
  }

  private validatePasswords(): void {
    this.formErrors = this.validation.validateAll(
      ['currentPassword', 'newPassword', 'confirmNewPassword'],
      this.form
    ).errors as ChangeProfileViewModel['formErrors'];
  }

  public handleCompleteNameInputChange(value: string): void {
    this.form.completeName = value;
    this.formErrors.completeName = this.validation.validate(
      'completeName',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public handleCurrentPasswordInputChange(value: string): void {
    this.form.currentPassword = value;
    this.validatePasswords();
    this.notifyViewAboutChanges();
  }

  public handleNewPasswordInputChange(value: string): void {
    this.form.newPassword = value;
    this.validatePasswords();
    this.notifyViewAboutChanges();
  }

  public handleConfirmNewPasswordInputChange(value: string): void {
    this.form.confirmNewPassword = value;
    this.validatePasswords();
    this.notifyViewAboutChanges();
  }

  private handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleClearPasswordState(): void {
    this.form = {
      ...this.form,
      newPassword: '',
      currentPassword: '',
      confirmNewPassword: '',
    };
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const validation = this.validation.validateAll(
      ['completeName', 'currentPassword', 'newPassword', 'confirmNewPassword'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors =
        validation.errors as ChangeProfileViewModel['formErrors'];
      this.notifyViewAboutChanges();
      return;
    }

    this.handleChangeLoadingState(true);

    const updateAccount = await this.authentication.updateAccount({
      name: this.form.completeName,
      currentPassword: this.form.currentPassword,
      newPassword: this.form.newPassword,
    });

    if (updateAccount) {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Show! Atualizado com sucesso',
        'Conseguimos atualizar seus dados, está tudo certo por aqui :)',
        'success'
      );
      this.handleClearPasswordState();
    } else {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Oops! Parece que algo deu errado',
        'Não conseguimos atualizar os seus dados, verifique os campos preenchidos e tente novamente',
        'error'
      );
    }
    this.handleChangeLoadingState(false);
  }
}
