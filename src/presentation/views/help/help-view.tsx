import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { HelpViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIcon } from '@/presentation/utils';
import {
  SubTitle,
  Paragraph,
  ContainerComunicationChannel,
  ContainerLink,
  ContainerLabelIcon,
  Icon,
  Label,
  spacing,
} from './styles';
import { currentTheme } from '@/presentation/themes';
import { ButtonComponent, LinkComponent } from '@/presentation/components';
import { BaseView } from '../base-view';
import { TREEFY_SUPPORT } from '@/presentation/constants';
import { Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export interface HelpViewProps
  extends NativeStackScreenProps<StackParamList, 'Help'> {
  helpViewModel: HelpViewModel;
}

export class HelpView
  extends React.Component<HelpViewProps>
  implements BaseView
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
          Disponibilizamos aos usuários os canais de comunicação para que entrem
          em contato conosco em caso de dúvidas, problemas no aplicativo ou
          propostas comerciais. O horário de funcionamento da central de ajuda é
          de segunda à sexta-feira das 09:00 até as 18:00.
        </Paragraph>
        <SubTitle style={spacing.subTitle}>Canais de comunicação:</SubTitle>
        <ContainerComunicationChannel>
          <ContainerLabelIcon>
            <Icon source={getIcon('mail')} resizeMode="center" />
            <Label>Email:</Label>
          </ContainerLabelIcon>
          <ContainerLink>
            <LinkComponent
              color={currentTheme.colors.body}
              fontSize={currentTheme.fonts.sizes.sm}
              style={spacing.link}
              onPress={() =>
                MailComposer.composeAsync({
                  recipients: [TREEFY_SUPPORT.email],
                  subject: 'Ajuda - contato via App',
                })
              }
            >
              {TREEFY_SUPPORT.email}
            </LinkComponent>
          </ContainerLink>
        </ContainerComunicationChannel>
        <ContainerComunicationChannel>
          <ContainerLabelIcon>
            <Icon source={getIcon('tel')} resizeMode="center" />
            <Label>Contato:</Label>
          </ContainerLabelIcon>
          <ContainerLink>
            <LinkComponent
              color={currentTheme.colors.body}
              fontSize={currentTheme.fonts.sizes.sm}
              style={spacing.link}
              onPress={() =>
                Linking.openURL(
                  `http://api.whatsapp.com/send?phone=55${TREEFY_SUPPORT.cel1}`
                )
              }
            >
              {TREEFY_SUPPORT.cel1}
            </LinkComponent>
            <LinkComponent
              color={currentTheme.colors.body}
              fontSize={currentTheme.fonts.sizes.sm}
              style={spacing.link}
              onPress={() =>
                Linking.openURL(
                  `http://api.whatsapp.com/send?phone=55${TREEFY_SUPPORT.cel2}`
                )
              }
            >
              {TREEFY_SUPPORT.cel2}
            </LinkComponent>
          </ContainerLink>
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
