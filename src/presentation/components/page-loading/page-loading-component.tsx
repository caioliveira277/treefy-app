import { useEffect, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, Title, Subtitle } from './styles';
import { useTheme } from 'styled-components';

export interface PageLoadingComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const PageLoadingComponent: React.FC<PageLoadingComponentProps> = ({
  style,
}) => {
  const theme = useTheme();
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <Container theme={theme} style={style}>
      <Title theme={theme}>Aguarde um pouco...</Title>
      <Subtitle theme={theme}>
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
