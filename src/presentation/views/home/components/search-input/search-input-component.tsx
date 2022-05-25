import {
  Button,
  Container,
  Label,
  InputContainer,
  Input,
  InformativeText,
  Icon,
} from './styles';
import { useTheme } from 'styled-components';
import { getIcon } from '@/presentation/utils';
import { StyleProp, ViewStyle } from 'react-native';

export interface SearchInputComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  style,
}) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Label>Buscar:</Label>
      <InputContainer style={{ ...theme.shadows.sm }}>
        <Input
          placeholderTextColor={theme.colors.placeholder}
          placeholder="Encontre pelo nome"
        />
        <Button>
          <Icon resizeMode="center" source={getIcon('search')} />
        </Button>
      </InputContainer>
      <InformativeText>Ex: Cacto, Samambaia, Manjericão...</InformativeText>
    </Container>
  );
};
