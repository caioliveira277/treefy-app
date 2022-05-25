import { Container, Image, SaluteContainer, SaluteText } from './styles';
// TODO: remove image after implementation
import temporaryImageProfile from '@assets/images/profile.png';
import { StyleProp, ViewStyle } from 'react-native';

export interface SalutationComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const SalutationComponent: React.FC<SalutationComponentProps> = ({
  style,
}) => {
  return (
    <Container style={style}>
      <Image source={temporaryImageProfile} resizeMode="center" />
      <SaluteContainer>
        <SaluteText>Olá Vanessa,</SaluteText>
        <SaluteText>que bom que voltou 🌱</SaluteText>
      </SaluteContainer>
    </Container>
  );
};
