import { Container, Image, SaluteContainer, SaluteText } from './styles';
import { StyleProp, ViewStyle } from 'react-native';
import { getProfile } from '@/presentation/utils';

export interface SalutationComponentProps {
  style?: StyleProp<ViewStyle>;
  name: string;
}

export const SalutationComponent: React.FC<SalutationComponentProps> = ({
  style,
  name,
}) => {
  return (
    <Container style={style}>
      <Image source={getProfile(name)} resizeMode="center" />
      <SaluteContainer>
        <SaluteText>Olá {name},</SaluteText>
        <SaluteText>que bom que voltou 🌱</SaluteText>
      </SaluteContainer>
    </Container>
  );
};
