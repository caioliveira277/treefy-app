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
  emailValue: string;
}

export class EmailConfirmationView
  extends React.Component<
    EmailConfirmationViewProps,
    EmailConfirmationViewState
  >
  implements BaseView<EmailConfirmationViewProps>
{
  private emailConfirmationViewModel: EmailConfirmationViewModel;

  constructor(props: EmailConfirmationViewProps) {
    super(props);

    const { emailConfirmationViewModel } = this.props;
    this.emailConfirmationViewModel = emailConfirmationViewModel;

    this.state = {
      emailValue: emailConfirmationViewModel.emailValue,
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
      emailValue: this.emailConfirmationViewModel.emailValue,
    });
  }

  render() {
    const { emailValue } = this.state;
    return (
      <PublicLayout
        title="Confirme o seu email"
        paragraph="Você receberá um email contendo um código para confirmação"
      >
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={emailValue}
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
