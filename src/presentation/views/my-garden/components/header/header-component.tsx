import { StyleProp, ViewStyle } from 'react-native';
import {
  ButtonNewPlant,
  ContainerHeader,
  ContainerTitleIcon,
  Icon,
  Title,
} from './styles';
import { getIcon } from '@/presentation/utils';
import { useTheme } from 'styled-components';

export interface HeaderComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ style }) => {
  const theme = useTheme();

  return (
    <ContainerHeader style={style}>
      <ContainerTitleIcon>
        <Title>Meu jardim</Title>
        <Icon source={getIcon('plant-active')} />
      </ContainerTitleIcon>
      <ButtonNewPlant style={{ ...theme.shadows.sm }}>
        <Icon source={getIcon('add-circle')} />
      </ButtonNewPlant>
    </ContainerHeader>
  );
};
