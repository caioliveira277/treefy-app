import { getIcon, IconName } from '@/presentation/utils';
import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  ContainerInput,
  Input,
  Label,
  GenericIcon,
  PasswordIcon,
  VisibilityPasswordButton,
} from './styles';

export interface TextInputComponentProps {
  iconName: IconName;
  label: string;
  placeholderText?: string;
  type?: 'text' | 'password';
  style?: StyleProp<ViewStyle>;
  initialValue?: string;
  onChangeText?: (value: string) => void;
}

export const TextInputComponent: React.FC<TextInputComponentProps> = ({
  iconName,
  label,
  placeholderText = '',
  type = 'text',
  style,
  initialValue = '',
  onChangeText = () => null,
}) => {
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);
  const handleChangeTextValue = (value: string) => {
    setInputValue(value);
    onChangeText(value);
  };

  return (
    <Container style={style}>
      <Label testID="label" theme={theme}>
        {label}
      </Label>
      <ContainerInput theme={theme}>
        <GenericIcon
          testID="genericIcon"
          source={getIcon(iconName)}
          resizeMode="center"
        />
        <Input
          testID="input"
          theme={theme}
          secureTextEntry={type === 'password' && !passwordVisible}
          placeholder={placeholderText}
          placeholderTextColor={theme.colors.placeholder}
          value={inputValue}
          onChangeText={handleChangeTextValue}
        />
        {type === 'password' ? (
          <VisibilityPasswordButton onPress={handlePasswordVisible}>
            <PasswordIcon
              source={
                passwordVisible ? getIcon('eye-close') : getIcon('eye-open')
              }
              resizeMode="center"
            />
          </VisibilityPasswordButton>
        ) : null}
      </ContainerInput>
    </Container>
  );
};
