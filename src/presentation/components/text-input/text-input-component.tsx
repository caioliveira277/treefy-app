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
  textareaStyles,
} from './styles';

export interface TextInputComponentProps {
  iconName: IconName;
  iconSize?: number;
  label: React.ReactNode | string;
  placeholderText?: string;
  type?: 'text' | 'password' | 'textarea';
  style?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: (value: string) => void;
}

export const TextInputComponent: React.FC<TextInputComponentProps> = ({
  iconName,
  label,
  placeholderText,
  iconSize = 24,
  type = 'text',
  style,
  value,
  onChangeText,
}) => {
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);
  const isTextarea = () => type === 'textarea';

  return (
    <Container style={style}>
      <Label testID="label" theme={theme}>
        {label}
      </Label>
      <ContainerInput
        theme={theme}
        style={isTextarea() ? textareaStyles.container : {}}
      >
        <GenericIcon
          iconSize={iconSize}
          testID="genericIcon"
          source={getIcon(iconName)}
          resizeMode="center"
          style={isTextarea() ? textareaStyles.icon : {}}
        />
        <Input
          testID="input"
          theme={theme}
          secureTextEntry={type === 'password' && !passwordVisible}
          placeholder={placeholderText}
          placeholderTextColor={theme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={isTextarea()}
          numberOfLines={isTextarea() ? 6 : undefined}
          style={isTextarea() ? textareaStyles.input : {}}
        />
        {type === 'password' ? (
          <VisibilityPasswordButton
            testID="visibilityPasswordButton"
            onPress={handlePasswordVisible}
          >
            <PasswordIcon
              iconSize={iconSize}
              source={
                passwordVisible ? getIcon('eye-open') : getIcon('eye-close')
              }
              resizeMode="center"
            />
          </VisibilityPasswordButton>
        ) : null}
      </ContainerInput>
    </Container>
  );
};
