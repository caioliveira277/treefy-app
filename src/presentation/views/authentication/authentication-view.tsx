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
  emailValue: string;
  passwordValue: string;
}

export class AuthenticationView
  extends React.Component<AuthenticationViewProps, AuthenticationViewState>
  implements BaseView<AuthenticationViewProps>
{
  private authenticationViewModel: AuthenticationViewModel;

  constructor(props: AuthenticationViewProps) {
    super(props);

    const { authenticationViewModel } = this.props;
    this.authenticationViewModel = authenticationViewModel;

    this.state = {
      emailValue: authenticationViewModel.emailValue,
      passwordValue: authenticationViewModel.passwordValue,
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
      emailValue: this.authenticationViewModel.emailValue,
      passwordValue: this.authenticationViewModel.passwordValue,
    });
  }

  render() {
    const { emailValue, passwordValue } = this.state;
    return (
      <PublicLayout title="Entre com a sua conta">
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={emailValue}
          onChangeText={(text) =>
            this.authenticationViewModel.handleEmailInputChange(text)
          }
        />
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Senha cadastrada:"
          placeholderText="Senha secreta"
          value={passwordValue}
          onChangeText={(text) =>
            this.authenticationViewModel.handlePasswordInputChange(text)
          }
        />
        <LinkComponent
          style={spacing.link}
          onPress={() =>
            this.authenticationViewModel.handleMoveToEmailConfirmation()
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
