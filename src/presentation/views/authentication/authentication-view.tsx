import React from 'react';
import {
  ButtonComponent,
  LinkComponent,
  TextInputComponent,
} from '@/presentation/components';
import { AuthenticationViewModel } from '@/presentation/view-models';
import { Container, Content, Ilustation, Title, spacing } from './styles';
import initialIlustration from '@assets/images/initial-ilustration.png';
import { BaseView } from '../base-view';

export interface AuthenticationViewProps {
  authenticationViewModel: AuthenticationViewModel;
}

export interface AuthenticationViewState {
  emailValue: string;
  passwordValue: string;
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
      <Container>
        <Ilustation source={initialIlustration} resizeMode="cover" />
        <Content>
          <Title style={spacing.title}>Entre com a sua conta</Title>
          <TextInputComponent
            style={spacing.input}
            iconName="mail"
            label="Email cadastrado:"
            placeholderText="Email cadastrado"
            value={emailValue}
            onChangeText={(text) =>
              this.authenticationViewModel.onEmailInputChange(text)
            }
          />
          <TextInputComponent
            iconName="lock"
            type="password"
            label="Senha cadastrada:"
            placeholderText="Senha secreta"
            value={passwordValue}
            onChangeText={(text) =>
              this.authenticationViewModel.onPasswordInputChange(text)
            }
          />
          <LinkComponent style={spacing.link}>
            Esqueceu sua senha?
          </LinkComponent>
          <ButtonComponent
            style={spacing.button}
            onPress={() => this.authenticationViewModel.onSubmit()}
          >
            Entrar
          </ButtonComponent>
        </Content>
      </Container>
    );
  }
}
