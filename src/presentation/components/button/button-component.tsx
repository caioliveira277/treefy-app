import { Button, Container, Text } from './styles';
import { useTheme } from 'styled-components';
import { StyleProp, ViewStyle } from 'react-native';

export interface ButtonComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Button style={{ ...theme.shadows.sm }}>
        <Text>{children}</Text>
      </Button>
    </Container>
  );
};
