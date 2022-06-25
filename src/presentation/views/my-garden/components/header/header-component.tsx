import { StyleProp, ViewStyle } from 'react-native';
import { ButtonNewPlant, Container } from './styles';
import {
  ContainerTitleIcon,
  Icon,
  Title,
} from '@/presentation/views/my-garden/styles';
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
        <Title>Meu jardim</Title>
        <Icon source={getIcon('plant-active')} resizeMode="center" />
      </ContainerTitleIcon>
      <ButtonNewPlant style={{ ...theme.shadows.sm }}>
        <Icon source={getIcon('add-circle')} resizeMode="center" />
      </ButtonNewPlant>
    </Container>
  );
};
