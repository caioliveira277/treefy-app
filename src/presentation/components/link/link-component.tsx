import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Link, Text } from './styles';

export interface LinkComponentProps {
  children: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  fontSize?: string;
  color?: string;
}

export const LinkComponent: React.FC<LinkComponentProps> = ({
  children,
  style,
  onPress,
  fontSize,
  color,
}) => {
  const theme = useTheme();
  return (
    <Container testID="container" style={style}>
      <Link testID="link" onPress={onPress}>
        <Text testID="text" theme={theme} fontSize={fontSize} color={color}>
          {children}
        </Text>
      </Link>
    </Container>
  );
};
