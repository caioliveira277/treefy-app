import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { HelpViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIcon } from '@/presentation/utils';
import {
  SubTitle,
  Paragraph,
  ContainerComunicationChannel,
  ContainerLabelIcon,
  Icon,
  Label,
  spacing,
} from './styles';
import { currentTheme } from '@/presentation/themes';
import { ButtonComponent, LinkComponent } from '@/presentation/components';
import { BaseView } from '../base-view';

export interface HelpViewProps
  extends NativeStackScreenProps<StackParamList, 'Help'> {
  helpViewModel: HelpViewModel;
}

export class HelpView
  extends React.Component<HelpViewProps>
  implements BaseView<HelpViewProps>
{
  private helpViewModel: HelpViewModel;

  constructor(props: HelpViewProps) {
    super(props);

    const { helpViewModel } = this.props;
    this.helpViewModel = helpViewModel;
  }

  public componentDidMount(): void {
    this.helpViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.helpViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return (
      <ProfileLayout title="Ajuda" image={getIcon('headset')}>
        <SubTitle style={spacing.subTitle}>Fale conosco:</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <SubTitle style={spacing.subTitle}>Canais de comunicação:</SubTitle>
        <ContainerComunicationChannel>
          <ContainerLabelIcon>
            <Icon source={getIcon('mail')} resizeMode="center" />
            <Label>Email:</Label>
          </ContainerLabelIcon>
          <LinkComponent
            color={currentTheme.colors.body}
            fontSize={currentTheme.fonts.sizes.sm}
            style={spacing.link}
          >
            contato@treefy.com.br
          </LinkComponent>
          <LinkComponent
            color={currentTheme.colors.body}
            fontSize={currentTheme.fonts.sizes.sm}
            style={spacing.link}
          >
            sugestoes@treefy.com.br
          </LinkComponent>
        </ContainerComunicationChannel>
        <ContainerComunicationChannel>
          <ContainerLabelIcon>
            <Icon source={getIcon('tel')} resizeMode="center" />
            <Label>Telefone:</Label>
          </ContainerLabelIcon>
          <LinkComponent
            color={currentTheme.colors.body}
            fontSize={currentTheme.fonts.sizes.sm}
            style={spacing.link}
          >
            (39) 9 8781-8187
          </LinkComponent>
          <LinkComponent
            color={currentTheme.colors.body}
            fontSize={currentTheme.fonts.sizes.sm}
            style={spacing.link}
          >
            (39) 3030-3030
          </LinkComponent>
        </ContainerComunicationChannel>
        <ButtonComponent
          type="outline"
          style={spacing.button}
          onPress={() => this.helpViewModel.handleMoveBack()}
        >
          Voltar
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
