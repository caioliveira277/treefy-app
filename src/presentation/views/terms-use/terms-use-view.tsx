import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { TermsUseViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIcon } from '@/presentation/utils';
import { SubTitle, Paragraph, spacing } from './styles';
import { ButtonComponent } from '@/presentation/components';
import { BaseView } from '../base-view';

export interface TermsUseViewProps
  extends NativeStackScreenProps<StackParamList, 'TermsUse'> {
  termsUseViewModel: TermsUseViewModel;
}

export class TermsUseView
  extends React.Component<TermsUseViewProps>
  implements BaseView
{
  private termsUseViewModel: TermsUseViewModel;

  constructor(props: TermsUseViewProps) {
    super(props);

    const { termsUseViewModel } = this.props;
    this.termsUseViewModel = termsUseViewModel;
  }

  public componentDidMount(): void {
    this.termsUseViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.termsUseViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return (
      <ProfileLayout title="Termos de uso" image={getIcon('document-check')}>
        <SubTitle>Introdução</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Concordamos em fornecer a você usuário o serviço da Treefy. O serviço
          inclui o aplicativo, recursos, serviços e tecnologias que fornecemos
          para promover a missão da Treefy: Fortificar seu conhecimento para
          obter um meio ambiente melhor. O serviço é composto pelos seguintes
          termos:
        </Paragraph>
        <SubTitle>Artigo 1</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Não cobramos pelo uso do aplicativo e serviços cobertos por estes
          termos. A Treefy é um serviço inteiramente gratuíto e nunca haverá
          cobrança aos usuários que estão cadastradas na plataforma.
        </Paragraph>
        <SubTitle>Artigo 2</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Não vendemos seus dados pessoais para anunciantes nem compartilhamos
          informações pessoais do usuários, como por exemplo: nome, e-mail entre
          outras informações que estão cadastradas no aplicativo.
        </Paragraph>
        <SubTitle>Artigo 3</SubTitle>
        <Paragraph>
          A Treefy se responsabiliza pela proteção dos dados dos usuários e pela
          manutenção de medidas de segurança, técnicas e administrativas aptas a
          proteger os dados pessoas dos usuários cadastrados.
        </Paragraph>
        <ButtonComponent
          type="outline"
          style={spacing.button}
          onPress={() => this.termsUseViewModel.handleMoveBack()}
        >
          Voltar
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
