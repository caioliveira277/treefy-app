import { StyleProp, ViewStyle } from 'react-native';
import { ModalState } from '@/presentation/@types/generics';
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
  toggleModal: (openState: ModalState) => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  style,
  toggleModal,
}) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <ContainerTitleIcon>
        <HeaderTitle>Meu jardim</HeaderTitle>
        <Icon source={getIcon('plant-active')} resizeMode="center" />
      </ContainerTitleIcon>
      <ButtonNewPlant
        style={{ ...theme.shadows.sm }}
        onPress={() => toggleModal(ModalState.open)}
      >
        <Icon source={getIcon('add-circle')} resizeMode="center" />
      </ButtonNewPlant>
    </Container>
  );
};
