import React from 'react';
import { ButtonComponent, TextInputComponent } from '@/presentation/components';
import { PublicLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { spacing } from './styles';
import { EmailConfirmationViewModel } from '@/presentation/view-models';

export interface EmailConfirmationViewProps
  extends NativeStackScreenProps<StackParamList, 'EmailConfirmation'> {
  emailConfirmationViewModel: EmailConfirmationViewModel;
}

export interface EmailConfirmationViewState {
  form: {
    email: string;
  };
  formErrors: EmailConfirmationViewState['form'];
  isLoading: boolean;
}

export class EmailConfirmationView
  extends React.Component<
    EmailConfirmationViewProps,
    EmailConfirmationViewState
  >
  implements BaseView
{
  private emailConfirmationViewModel: EmailConfirmationViewModel;

  constructor(props: EmailConfirmationViewProps) {
    super(props);

    const { emailConfirmationViewModel } = this.props;
    this.emailConfirmationViewModel = emailConfirmationViewModel;

    this.state = {
      form: emailConfirmationViewModel.form,
      formErrors: emailConfirmationViewModel.formErrors,
      isLoading: emailConfirmationViewModel.isLoading,
    };
  }

  public componentDidMount(): void {
    this.emailConfirmationViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.emailConfirmationViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      form: this.emailConfirmationViewModel.form,
      formErrors: this.emailConfirmationViewModel.formErrors,
      isLoading: this.emailConfirmationViewModel.isLoading,
    });
  }

  render() {
    const {
      form: { email },
      isLoading,
    } = this.state;
    const { email: emailError } = this.state.formErrors;
    return (
      <PublicLayout
        title="Confirme o seu email"
        paragraph="Você receberá um email contendo um código para confirmação"
        isLoading={isLoading}
      >
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={email}
          errorMessage={emailError}
          onChangeText={(text) =>
            this.emailConfirmationViewModel.handleEmailInputChange(text)
          }
        />
        <ButtonComponent
          onPress={() => this.emailConfirmationViewModel.handleSubmit()}
          style={spacing.button}
        >
          Receber código
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
