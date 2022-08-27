import { BaseViewModelImpl } from '../base-view-model-impl';
import { ChangeProfileViewModel } from './change-profile-model';
import { Alert } from 'react-native';
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
    this.setUserData();
  }

  private async setUserData(): Promise<void> {
    const user = await this.authentication.getAuthenticatedUser();
    this.form = {
      ...this.form,
      completeName: user.name,
      email: user.email,
    };
    this.notifyViewAboutChanges();
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
    this.formErrors.currentPassword = this.validation.validate(
      'currentPassword',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public handleNewPasswordInputChange(value: string): void {
    this.form.newPassword = value;
    this.formErrors.newPassword = this.validation.validate(
      'newPassword',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public handleConfirmNewPasswordInputChange(value: string): void {
    this.form.confirmNewPassword = value;
    this.formErrors.confirmNewPassword = this.validation.validate(
      'confirmNewPassword',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
    this.notifyViewAboutChanges();
  }

  public handleClearPasswordState(): void {
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
      Alert.alert('Success!', 'Save successfully');
      this.handleClearPasswordState();
    }
    this.handleChangeLoadingState(false);
  }
}
