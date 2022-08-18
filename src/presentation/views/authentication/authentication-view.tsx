import React from 'react';
import {
  ButtonComponent,
  LinkComponent,
  TextInputComponent,
} from '@/presentation/components';
import { AuthenticationViewModel } from '@/presentation/view-models';
import { PublicLayout } from '@/presentation/layouts';
import { spacing } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';

export interface AuthenticationViewProps
  extends NativeStackScreenProps<StackParamList, 'Authentication'> {
  authenticationViewModel: AuthenticationViewModel;
}

export interface AuthenticationViewState {
  form: {
    email: string;
    password: string;
  };
  formErrors: AuthenticationViewState['form'];
  isLoading: boolean;
}

export class AuthenticationView
  extends React.Component<AuthenticationViewProps, AuthenticationViewState>
  implements BaseView
{
  private authenticationViewModel: AuthenticationViewModel;

  constructor(props: AuthenticationViewProps) {
    super(props);

    const { authenticationViewModel } = this.props;
    this.authenticationViewModel = authenticationViewModel;

    this.state = {
      form: authenticationViewModel.form,
      formErrors: authenticationViewModel.formErrors,
      isLoading: authenticationViewModel.isLoading,
    };
  }

  public componentDidMount(): void {
    this.authenticationViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.authenticationViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      form: this.authenticationViewModel.form,
      formErrors: this.authenticationViewModel.formErrors,
      isLoading: this.authenticationViewModel.isLoading,
    });
  }

  render() {
    const {
      form: { email, password },
      isLoading,
    } = this.state;
    const { email: emailError, password: passwordError } =
      this.state.formErrors;
    return (
      <PublicLayout title="Entre com a sua conta" isLoading={isLoading}>
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={email}
          errorMessage={emailError}
          onChangeText={(text) =>
            this.authenticationViewModel.handleEmailInputChange(text)
          }
        />
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Senha cadastrada:"
          placeholderText="Senha secreta"
          value={password}
          errorMessage={passwordError}
          onChangeText={(text) =>
            this.authenticationViewModel.handlePasswordInputChange(text)
          }
        />
        <LinkComponent
          style={spacing.link}
          onPress={() =>
            this.authenticationViewModel.handleMoveToForgotPassword()
          }
        >
          Esqueceu sua senha?
        </LinkComponent>
        <ButtonComponent
          style={spacing.button}
          onPress={() => this.authenticationViewModel.handleSubmit()}
        >
          Entrar
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
