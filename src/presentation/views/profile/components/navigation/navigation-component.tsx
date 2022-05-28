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
import { getIcon } from '@/presentation/utils';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface NavigationComponentProps {
  style?: StyleProp<ViewStyle>;
  onPress: (routeName: keyof MainRoutesParamsList) => void;
}

export const NavigationComponent: React.FC<NavigationComponentProps> = ({
  style,
  onPress,
}) => {
  const theme = useTheme();

  const NavItem: React.FC<{
    icon: ImageSourcePropType;
    title: string;
    description: string;
    routeName: keyof MainRoutesParamsList;
  }> = ({ icon, title, description, routeName }) => (
    <ItemContainer onPress={() => onPress(routeName)}>
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
        icon={headsetIcon}
        title="Ajuda"
        description="Fale conosco..."
        routeName="Profile"
      />
      <ItemSeparator />
      <NavItem
        icon={documentCheckIcon}
        title="Termos de uso"
        description="Termos, condições, privacidade..."
        routeName="Profile"
      />
    </Container>
  );
};
