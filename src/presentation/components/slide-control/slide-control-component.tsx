import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { Container, Point } from './styles';

export interface SlideControlProps {
  onPress?: (index: number) => void;
  countOfItems: number;
  activeSlideIndex?: number;
  style?: StyleProp<ViewStyle>;
}

export const SlideControlComponent: React.FC<SlideControlProps> = ({
  onPress,
  countOfItems,
  activeSlideIndex = 0,
  style,
}) => {
  const theme = useTheme();
  return (
    <Container style={style}>
      {Array(countOfItems)
        .fill(null)
        .map((_v, index) => (
          <Point
            testID="point"
            onPress={() => (onPress ? onPress(index) : null)}
            disabled={activeSlideIndex === index}
            theme={theme}
            active={activeSlideIndex === index}
            key={index}
          />
        ))}
    </Container>
  );
};
