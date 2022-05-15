import React from 'react';
import { ButtonComponent } from '@/presentation/components';
import { AccessViewModel } from '@/presentation/view-models';
import {
  Container,
  Content,
  Ilustation,
  Title,
  spacing,
  Paragraph,
} from './styles';
import initialIlustration from '@assets/images/initial-ilustration.png';
import { BaseView } from '../base-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
export interface AccessViewProps
  extends NativeStackScreenProps<StackParamList, 'Access'> {
  accessViewModel: AccessViewModel;
}

export class AccessView
  extends React.Component<AccessViewProps>
  implements BaseView<AccessViewProps>
{
  private accessViewModel: AccessViewModel;

  constructor(props: AccessViewProps) {
    super(props);

    const { accessViewModel } = this.props;
    this.accessViewModel = accessViewModel;
  }

  public componentDidMount(): void {
    this.accessViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.accessViewModel.detachView();
  }

  public onViewModelChanged() {}

  render() {
    return (
      <Container>
        <Ilustation source={initialIlustration} resizeMode="cover" />
        <Content>
          <Title style={spacing.title}>O que você gostaria de fazer?</Title>
          <Paragraph style={spacing.paragraph}>
            Você pode acessar a sua conta já cadastrada ou se for novo por aqui,
            pode cadastrar uma conta
          </Paragraph>
          <ButtonComponent
            style={spacing.buttonAccessAccount}
            onPress={() => this.accessViewModel.handleAccessAccount()}
          >
            Acessar conta
          </ButtonComponent>
          <ButtonComponent
            type="outline"
            onPress={() => this.accessViewModel.handleSignup()}
          >
            Cadastrar
          </ButtonComponent>
        </Content>
      </Container>
    );
  }
}
