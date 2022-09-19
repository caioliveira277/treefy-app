import { Skeleton } from 'moti/skeleton';
import { StyleProp, ViewStyle } from 'react-native';
import { Container, Item } from './styles';

export interface SkeletonLoadingComponentProps {
  skeletons: {
    width?: number;
    height?: number;
    radius?: number;
    style?: StyleProp<ViewStyle>;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
  show: boolean;
}

export const SkeletonLoadingComponent: React.FC<
  SkeletonLoadingComponentProps
> = ({ skeletons, containerStyle, show }) => {
  return (
    <Container style={containerStyle}>
      {skeletons.map(({ width, height, radius = 5, style }, i) => (
        <Item key={i} style={style}>
          <Skeleton
            width={width}
            height={height}
            show={show}
            colorMode="light"
            radius={radius || 'square'}
            transition={{
              translateX: {
                type: 'timing',
                duration: 600,
              },
            }}
            colors={['#d5dfe4', '#f0f3f5']}
          />
        </Item>
      ))}
    </Container>
  );
};
