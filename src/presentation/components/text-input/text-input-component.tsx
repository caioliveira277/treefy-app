import { getIcon, IconeName } from '@/presentation/utils';
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
  iconeName: IconeName;
  label: string;
  placeholderText: string;
  type?: 'text' | 'password';
  style?: StyleProp<ViewStyle>;
}

export const TextInputComponent: React.FC<TextInputComponentProps> = ({
  iconeName,
  label,
  placeholderText,
  type = 'text',
  style,
}) => {
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);

  return (
    <Container style={style}>
      <Label>{label}</Label>
      <ContainerInput>
        <GenericIcon source={getIcon(iconeName)} resizeMode="center" />
        <Input
          secureTextEntry={type === 'password' && !passwordVisible}
          placeholder={placeholderText}
          placeholderTextColor={theme.colors.placeholder}
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
