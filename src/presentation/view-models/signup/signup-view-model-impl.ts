import { BaseViewModelImpl } from '../base-view-model-impl';
import { SignupViewModel } from './signup-view-model';
import { Signup } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export class SignupViewModelImpl
  extends BaseViewModelImpl
  implements SignupViewModel
{
  public readonly validation: Validation;

  public readonly signup: Signup;

  public form = {
    completeName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  public formErrors = {
    completeName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  public isLoading = false;

  constructor(signup: Signup, validation: Validation) {
    super();
    this.signup = signup;
    this.validation = validation;
  }

  public handleCompleteNameInputChange(value: string): void {
    this.form.completeName = value;
    this.formErrors.completeName = this.validation.validate(
      'completeName',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  public handleEmailInputChange(value: string): void {
    this.form.email = value;
    this.formErrors.email = this.validation.validate('email', this.form);
    this.notifyViewAboutChanges();
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
      ['completeName', 'email', 'password', 'confirmPassword'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors = validation.errors as SignupViewModel['formErrors'];
      this.notifyViewAboutChanges();
      return;
    }

    this.handleChangeLoadingState(true);

    const signup = await this.signup.signup({
      name: this.form.completeName,
      email: this.form.email,
      password: this.form.password,
    });

    if (signup) {
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'CodeConfirmation',
        params: {
          email: this.form.email,
          password: this.form.password,
          flow: 'Signup',
        },
      });
    } else {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Oops!, falha ao cadastrar',
        'Tivemos um problema ao cadastrar sua conta, verifique os dados e tente novamente',
        'error'
      );
    }
    this.handleChangeLoadingState(false);
  }
}
