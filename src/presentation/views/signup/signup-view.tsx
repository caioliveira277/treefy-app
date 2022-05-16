import React from 'react';
import { ButtonComponent, TextInputComponent } from '@/presentation/components';
import { PublicLayout } from '@/presentation/layouts';
import { SignupViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing, Legend } from './styles';
import { BaseView } from '../base-view';

export interface SignupViewProps
  extends NativeStackScreenProps<StackParamList, 'Signup'> {
  signupViewModel: SignupViewModel;
}

export interface SignupViewState {
  completeNameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
}

export class SignupView
  extends React.Component<SignupViewProps, SignupViewState>
  implements BaseView<SignupViewProps>
{
  private signupViewModel: SignupViewModel;

  constructor(props: SignupViewProps) {
    super(props);

    const { signupViewModel } = props;
    this.signupViewModel = signupViewModel;

    this.state = {
      completeNameValue: signupViewModel.completeNameValue,
      emailValue: signupViewModel.emailValue,
      passwordValue: signupViewModel.passwordValue,
      confirmPasswordValue: signupViewModel.confirmPasswordValue,
    };
  }

  public componentDidMount(): void {
    this.signupViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.signupViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      completeNameValue: this.signupViewModel.completeNameValue,
      emailValue: this.signupViewModel.emailValue,
      passwordValue: this.signupViewModel.passwordValue,
      confirmPasswordValue: this.signupViewModel.confirmPasswordValue,
    });
  }

  render() {
    const {
      completeNameValue,
      emailValue,
      passwordValue,
      confirmPasswordValue,
    } = this.state;
    return (
      <PublicLayout title="Cadastre-se para ter acesso">
        <Legend>Seu perfil:</Legend>
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="user"
          label="Nome e sobrenome:"
          placeholderText="Nome e sobrenome"
          value={completeNameValue}
          onChangeText={(text) =>
            this.signupViewModel.handleCompleteNameInputChange(text)
          }
        />
        <Legend>Campos de acesso:</Legend>
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={emailValue}
          onChangeText={(text) =>
            this.signupViewModel.handleEmailInputChange(text)
          }
        />
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="lock"
          type="password"
          label="Senha:"
          placeholderText="Senha secreta"
          value={passwordValue}
          onChangeText={(text) =>
            this.signupViewModel.handlePasswordInputChange(text)
          }
        />
        <Legend>Confirmação:</Legend>
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a senha:"
          placeholderText="Senha secreta"
          value={confirmPasswordValue}
          onChangeText={(text) =>
            this.signupViewModel.handleConfirmPasswordInputChange(text)
          }
        />
        <ButtonComponent
          type="outline"
          onPress={() => this.signupViewModel.handleSubmit()}
          style={spacing.button}
        >
          Cadastrar
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
