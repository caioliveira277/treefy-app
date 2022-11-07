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
import { DefaultTheme, useTheme } from 'styled-components';
import { getIcon } from '@/presentation/utils';
import { StyleProp, ViewStyle } from 'react-native';
import { useDebounce } from '@/presentation/hooks';

export interface SearchInputComponentProps {
  style?: StyleProp<ViewStyle>;
  onSubmit: (search: string) => void;
  infoMessage?: string;
  placeholder?: string;
  titleFontSize: keyof DefaultTheme['fonts']['sizes'];
  editable?: boolean;
}

export const SearchInputComponent: React.FC<SearchInputComponentProps> = ({
  style,
  onSubmit,
  infoMessage,
  placeholder = '',
  titleFontSize,
  editable = true,
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
      <Label titleFontSize={titleFontSize}>Buscar:</Label>
      <InputContainer style={{ ...theme.shadows.sm }}>
        <Input
          onChangeText={handleInputSearch}
          value={search}
          placeholderTextColor={theme.colors.placeholder}
          placeholder={placeholder}
          editable={editable}
        />
        <Button onPress={handleClear}>
          {search ? (
            <Icon resizeMode="center" source={getIcon('close')} />
          ) : (
            <Icon resizeMode="center" source={getIcon('search')} />
          )}
        </Button>
      </InputContainer>
      {infoMessage ? <InformativeText>{infoMessage}</InformativeText> : null}
    </Container>
  );
};
