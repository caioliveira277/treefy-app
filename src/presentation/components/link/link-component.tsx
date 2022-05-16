import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Link, Text } from './styles';

export interface LinkComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const LinkComponent: React.FC<LinkComponentProps> = ({
  children,
  style,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <Container testID="container" style={style}>
      <Link testID="link" onPress={onPress}>
        <Text testID="text" theme={theme}>
          {children}
        </Text>
      </Link>
    </Container>
  );
};
