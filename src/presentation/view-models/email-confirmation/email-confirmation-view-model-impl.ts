import { EmailConfirmationViewModel } from './email-confirmation-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';
import { Validation } from '@/presentation/protocols/validation';

export class EmailConfirmationViewModelImpl
  extends BaseViewModelImpl
  implements EmailConfirmationViewModel
{
  public readonly validation: Validation;

  public readonly authentication: Authentication;

  public form = { email: '' };

  public formErrors = { email: '' };

  public isLoading = false;

  public constructor(authentication: Authentication, validation: Validation) {
    super();
    this.authentication = authentication;
    this.validation = validation;
  }

  public handleEmailInputChange(value: string): void {
    this.form.email = value;
    this.formErrors.email = this.validation.validate('email', this.form);
    this.notifyViewAboutChanges();
  }

  public handleChangeLoadingState(state: boolean): void {
    this.isLoading = state;
    this.notifyViewAboutChanges();
  }

  public async handleSubmit(): Promise<void> {
    const validation = this.validation.validateAll(
      ['email', 'password'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors =
        validation.errors as EmailConfirmationViewModel['formErrors'];
      this.notifyViewAboutChanges();
      return;
    }

    this.handleChangeLoadingState(true);

    const codeSent = await this.authentication.sendCodeToChangePassword({
      email: this.form.email,
    });

    if (codeSent) {
      this.baseView?.props.navigation.navigate('Public', {
        screen: 'CodeConfirmation',
        params: {
          email: this.form.email,
          flow: 'ForgotPassword',
        },
      });
    } else {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Oops! Erro ao enviar',
        'Infelimente não conseguimos enviar o código, verifique o e-mail informado e tente novamente',
        'error'
      );
    }
    this.handleChangeLoadingState(false);
  }
}
