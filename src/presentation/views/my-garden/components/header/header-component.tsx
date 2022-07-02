import { StyleProp, ViewStyle } from 'react-native';
import {
  ButtonNewPlant,
  Container,
  HeaderTitle,
  ContainerTitleIcon,
  Icon,
} from './styles';
import { getIcon } from '@/presentation/utils';
import { useTheme } from 'styled-components';

export interface HeaderComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ style }) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <ContainerTitleIcon>
        <HeaderTitle>Meu jardim</HeaderTitle>
        <Icon source={getIcon('plant-active')} resizeMode="center" />
      </ContainerTitleIcon>
      <ButtonNewPlant style={{ ...theme.shadows.sm }}>
        <Icon source={getIcon('add-circle')} resizeMode="center" />
      </ButtonNewPlant>
    </Container>
  );
};
