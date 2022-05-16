import { Button, Container, Text } from './styles';
import { useTheme } from 'styled-components';
import { StyleProp, ViewStyle } from 'react-native';

export type ButtonType = 'default' | 'outline';
export interface ButtonComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  type?: ButtonType;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  style,
  onPress,
  type = 'default',
}) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Button
        testID="button"
        type={type}
        onPress={onPress}
        theme={theme}
        style={{ ...theme.shadows.sm }}
      >
        <Text testID="text" type={type} theme={theme}>
          {children}
        </Text>
      </Button>
    </Container>
  );
};
