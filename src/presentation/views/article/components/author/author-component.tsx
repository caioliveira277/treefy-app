import { getProfile } from '@/presentation/utils';
import {
  Container,
  ContentContainer,
  Description,
  Image,
  Name,
  NameDescriptionContainer,
  Title,
} from './styles';

export interface AuthorComponentProps {
  name: string;
  description: string;
}

export const AuthorComponent: React.FC<AuthorComponentProps> = ({
  name,
  description,
}) => {
  return (
    <Container>
      <Title>Publicado por:</Title>
      <ContentContainer>
        <Image source={getProfile(name)} resizeMode="center" />
        <NameDescriptionContainer>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </NameDescriptionContainer>
      </ContentContainer>
    </Container>
  );
};
