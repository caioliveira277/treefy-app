import { formatDate, getProfile } from '@/presentation/utils';
import { AuthorLoadingComponent } from './author-loading-component';
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
  createdAt: Date;
  isLoading: boolean;
}

export const AuthorComponent: React.FC<AuthorComponentProps> = ({
  name,
  createdAt,
  isLoading,
}) => {
  return (
    <Container>
      {isLoading ? (
        <AuthorLoadingComponent />
      ) : (
        <>
          <Title>Publicado por:</Title>
          <ContentContainer>
            <Image source={getProfile(name)} resizeMode="center" />
            <NameDescriptionContainer>
              <Name>{name}</Name>
              <Description>
                Criando conteúdos de qualidade na Treefy desde{' '}
                {formatDate(createdAt)}
              </Description>
            </NameDescriptionContainer>
          </ContentContainer>
        </>
      )}
    </Container>
  );
};
