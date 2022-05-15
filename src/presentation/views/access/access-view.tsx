import React from 'react';
import { ButtonComponent } from '@/presentation/components';
import { AccessViewModel } from '@/presentation/view-models';
import { PublicLayout } from '@/presentation/layouts';
import { spacing } from './styles';
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
      <PublicLayout
        title="O que você gostaria de fazer?"
        paragraph="Você pode acessar a sua conta já cadastrada ou se for novo por aqui,
      pode cadastrar uma conta"
      >
        <ButtonComponent
          style={spacing.buttonAccessAccount}
          onPress={() => this.accessViewModel.handleMoveToAuthentication()}
        >
          Acessar conta
        </ButtonComponent>
        <ButtonComponent
          type="outline"
          onPress={() => this.accessViewModel.handleMoveToSignup()}
        >
          Cadastrar
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
