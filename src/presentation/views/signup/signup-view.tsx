import React from 'react';
import {
  ButtonComponent,
  TextInputComponent,
  LegendComponent,
} from '@/presentation/components';
import { PublicLayout } from '@/presentation/layouts';
import { SignupViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from './styles';
import { BaseView } from '../base-view';

export interface SignupViewProps
  extends NativeStackScreenProps<StackParamList, 'Signup'> {
  signupViewModel: SignupViewModel;
}

export interface SignupViewState {
  form: {
    completeName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  formErrors: SignupViewState['form'];
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
      form: signupViewModel.form,
      formErrors: signupViewModel.formErrors,
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
      form: this.signupViewModel.form,
      formErrors: this.signupViewModel.formErrors,
    });
  }

  render() {
    const { completeName, email, password, confirmPassword } = this.state.form;
    const {
      completeName: completeNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    } = this.state.formErrors;
    return (
      <PublicLayout title="Cadastre-se para ter acesso">
        <LegendComponent>Seu perfil:</LegendComponent>
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="user"
          label="Nome e sobrenome:"
          placeholderText="Nome e sobrenome"
          value={completeName}
          errorMessage={completeNameError}
          onChangeText={(text) =>
            this.signupViewModel.handleCompleteNameInputChange(text)
          }
        />
        <LegendComponent>Campos de acesso:</LegendComponent>
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={email}
          errorMessage={emailError}
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
          value={password}
          errorMessage={passwordError}
          onChangeText={(text) =>
            this.signupViewModel.handlePasswordInputChange(text)
          }
        />
        <LegendComponent>Confirmação:</LegendComponent>
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a senha:"
          placeholderText="Senha secreta"
          value={confirmPassword}
          errorMessage={confirmPasswordError}
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
