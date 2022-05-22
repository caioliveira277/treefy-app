import { Container, Image, SaluteContainer, SaluteText } from './styles';
// TODO: remove image after implementation
import temporaryImageProfile from '@assets/images/profile.png';

export const SalutationComponent: React.FC = () => {
  return (
    <Container>
      <Image source={temporaryImageProfile} resizeMode="center" />
      <SaluteContainer>
        <SaluteText>Olá Vanessa,</SaluteText>
        <SaluteText>que bom que voltou 🌱</SaluteText>
      </SaluteContainer>
    </Container>
  );
};
