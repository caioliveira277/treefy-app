import { useEffect, useState } from 'react';
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
import { useDebounce } from '@/presentation/hooks';

export interface SearchInputComponentProps {
  style?: StyleProp<ViewStyle>;
  onSubmit: (search: string) => void;
}

export const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  style,
  onSubmit,
}) => {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce<string>(search, 500);
  const theme = useTheme();

  const handleInputSearch = (text: string) => setSearch(text);
  const handleClear = () => setSearch('');

  useEffect(() => {
    onSubmit(search);
  }, [searchDebounce]);

  return (
    <Container style={style}>
      <Label>Buscar:</Label>
      <InputContainer style={{ ...theme.shadows.sm }}>
        <Input
          onChangeText={handleInputSearch}
          value={search}
          placeholderTextColor={theme.colors.placeholder}
          placeholder="Encontre conteúdos relacionados"
        />
        <Button onPress={handleClear}>
          {search ? (
            <Icon resizeMode="center" source={getIcon('close')} />
          ) : (
            <Icon resizeMode="center" source={getIcon('search')} />
          )}
        </Button>
      </InputContainer>
      <InformativeText>
        Ex: Como cuidar, dicas, girassóis, adubo...
      </InformativeText>
    </Container>
  );
};
