import React from 'react';
import { ButtonComponent, TextInputComponent } from '@/presentation/components';
import { AuthenticationViewModel } from '@/presentation/view-models';
import { Container, Content, Ilustation, Title, spacing } from './styles';
import initialIlustration from '@assets/images/initial-ilustration.png';

export interface AuthenticationViewProps {
  authenticationViewModel: AuthenticationViewModel;
}

export class AuthenticationView extends React.Component<AuthenticationViewProps> {
  render() {
    return (
      <Container>
        <Ilustation source={initialIlustration} resizeMode="cover" />
        <Content>
          <Title style={spacing.title}>Entre com a sua conta</Title>
          <TextInputComponent
            style={spacing.input}
            iconeName="mail"
            label="Email cadastrado:"
            placeholderText="Email cadastrado"
          />
          <TextInputComponent
            iconeName="lock"
            type="password"
            label="Senha cadastrada:"
            placeholderText="Senha secreta"
          />
          <ButtonComponent style={spacing.button}>Entrar</ButtonComponent>
        </Content>
      </Container>
    );
  }
}
