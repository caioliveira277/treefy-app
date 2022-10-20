import {
  Container,
  ItemContainer,
  Icon,
  TextContainer,
  Title,
  Description,
  ArrowIcon,
  IconContainer,
  ItemSeparator,
} from './styles';
import { useTheme } from 'styled-components';
import userIcon from '@assets/icons/navigation-profile/user.png';
import headsetIcon from '@assets/icons/navigation-profile/headset.png';
import documentCheckIcon from '@assets/icons/navigation-profile/document-check.png';
import sendMailIcon from '@assets/icons/navigation-profile/send-mail.png';
import { getIcon } from '@/presentation/utils';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { AccountModel } from '@/domain/models';
import { TREEFY_SUPPORT } from '@/presentation/constants';

export interface NavigationComponentProps {
  style?: StyleProp<ViewStyle>;
  onPress: (routeName: keyof MainSubRoutes) => void;
  user?: AccountModel;
}

export const NavigationComponent: React.FC<NavigationComponentProps> = ({
  style,
  onPress,
  user,
}) => {
  const theme = useTheme();

  const NavItem: React.FC<{
    icon: ImageSourcePropType;
    title: string;
    description: string;
    routeName?: keyof MainSubRoutes;
    onNavigate?: () => void;
  }> = ({ icon, title, description, routeName, onNavigate = () => null }) => (
    <ItemContainer
      onPress={() => (routeName ? onPress(routeName) : onNavigate())}
    >
      <IconContainer>
        <Icon source={icon} resizeMode="center" />
      </IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
      <ArrowIcon source={getIcon('arrow-right')} resizeMode="center" />
    </ItemContainer>
  );

  return (
    <Container style={[{ ...theme.shadows.sm }, style]}>
      <NavItem
        icon={userIcon}
        title="Alterar informações pessoais"
        description="Nome, senha, foto..."
        routeName="ChangeProfile"
      />
      <ItemSeparator />
      <NavItem
        icon={documentCheckIcon}
        title="Termos de uso"
        description="Termos, condições, privacidade..."
        routeName="TermsUse"
      />
      <ItemSeparator />
      <NavItem
        icon={headsetIcon}
        title="Ajuda"
        description="Fale conosco..."
        routeName="Help"
      />
      <ItemSeparator />
      <NavItem
        icon={sendMailIcon}
        title="Gostaria de criar conteúdos?"
        description="Envie a sua solicitação para a nossa análise."
        onNavigate={() => {
          MailComposer.composeAsync({
            subject: 'Solicitação - criador de conteúdos',
            ccRecipients: [user?.email || ''],
            recipients: [TREEFY_SUPPORT.email],
            body:
              'Olá Treefy Team.\n\n' +
              `Me chamo ${user?.name} e gostaria de fazer parte do time de criação de conteúdos informativos para a plataforma.\n\n` +
              '[fale um pouco sobre sua experiência com platas aqui]\n\n' +
              'Att.\n' +
              `Email associado à minha conta: ${user?.email}`,
          });
        }}
      />
    </Container>
  );
};
