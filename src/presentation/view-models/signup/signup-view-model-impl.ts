import { BaseViewModelImpl } from '../base-view-model-impl';
import { SignupViewModel } from './signup-view-model';
import { Alert } from 'react-native';
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

  constructor(signup: Signup, validation: Validation) {
    super();
    this.signup = signup;
    this.validation = validation;
  }

  handleCompleteNameInputChange(value: string): void {
    this.form.completeName = value;
    this.formErrors.completeName = this.validation.validate(
      'completeName',
      this.form
    );
    this.notifyViewAboutChanges();
  }

  handleEmailInputChange(value: string): void {
    this.form.email = value;
    this.formErrors.email = this.validation.validate('email', this.form);
    this.notifyViewAboutChanges();
  }

  handlePasswordInputChange(value: string): void {
    this.form.password = value;
    this.formErrors.password = this.validation.validate('password', this.form);
    this.notifyViewAboutChanges();
  }

  handleConfirmPasswordInputChange(value: string): void {
    this.form.confirmPassword = value;
    this.formErrors.confirmPassword = this.validation.validate(
      'confirmPassword',
      this.form
    );
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
      Alert.alert('Error!', 'failed to register');
    }
  }
}
