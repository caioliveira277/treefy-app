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

export const SearchInputComponent: React.FC = () => {
  const theme = useTheme();

  return (
    <Container>
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
