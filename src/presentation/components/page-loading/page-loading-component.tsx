import { useEffect, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, Title, Subtitle } from './styles';

export interface PageLoadingComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const PageLoadingComponent: React.FC<PageLoadingComponentProps> = ({
  style,
}) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <Container style={style}>
      <Title>Aguarde um pouco...</Title>
      <Subtitle>
        Estamos trabalhando para entregar as informações que você precisa
      </Subtitle>
      <LottieView
        autoPlay
        ref={animation}
        loop={true}
        speed={1.5}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('@assets/animations/plant-loading.json')}
      />
    </Container>
  );
};
