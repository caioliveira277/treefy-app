import { getIcon, IconName } from '@/presentation/utils';
import { useState } from 'react';
import { KeyboardType, StyleProp, ViewStyle } from 'react-native';
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
  TextError,
  TextInfo,
} from './styles';

export interface TextInputComponentProps {
  iconName: IconName;
  iconSize?: number;
  label?: React.ReactNode | string;
  placeholderText?: string;
  type?: 'text' | 'password' | 'textarea';
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  value?: string;
  keyboardType?: KeyboardType;
  errorMessage?: string;
  infoMessage?: string;
  onChangeText?: (value: string) => void;
}

export const TextInputComponent: React.FC<TextInputComponentProps> = ({
  iconName,
  label,
  placeholderText,
  iconSize = 24,
  type = 'text',
  style = {},
  styleInput = {},
  keyboardType = 'default',
  value,
  errorMessage,
  infoMessage,
  onChangeText,
}) => {
  const theme = useTheme();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePasswordVisible = () => setPasswordVisible(!passwordVisible);
  const isTextarea = () => type === 'textarea';

  const displayMessage = () => {
    if (errorMessage) {
      return <TextError>{errorMessage}</TextError>;
    } else if (infoMessage) {
      return <TextInfo>{infoMessage}</TextInfo>;
    } else {
      return null;
    }
  };

  return (
    <Container style={style}>
      {label ? (
        <Label testID="label" theme={theme}>
          {label}
        </Label>
      ) : null}

      <ContainerInput
        theme={theme}
        style={isTextarea() ? textareaStyles.container : {}}
        hasError={!!errorMessage}
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
          keyboardType={keyboardType}
          style={{
            ...(isTextarea() ? textareaStyles.input : {}),
            ...(styleInput as Object),
          }}
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
      {displayMessage()}
    </Container>
  );
};
