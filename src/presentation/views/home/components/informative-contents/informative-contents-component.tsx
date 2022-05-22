import {
  Container,
  Title,
  TransparentContainer,
  CardContainer,
  CardContainerColumnContent,
  CardTitle,
  CardDescription,
  CardAuthor,
  CardCategoriesContainer,
  CardCategoriesTitle,
  CardCategoriesItemsContainer,
  CardCategoriesItemWrap,
  CardCategoriesItem,
  CardCategoriesItemPoint,
  CardFooterContainer,
  CardFooterDateContainer,
  CardFooterIcon,
  CardFooterDateText,
  CardFooterRateContainer,
  CardFooterRateText,
  CardContainerColumnImage,
  CardImageBackground,
  CardImage,
} from './styles';
import { getIcon } from '@/presentation/utils';
import { useTheme } from 'styled-components';
import backgroundCardIlustration from '@assets/images/background-card-ilustration.png';
import postImage1 from '@assets/images/post-1.png';
import postImage2 from '@assets/images/post-2.png';
import postImage3 from '@assets/images/post-3.png';

const temporaryData = [
  {
    title: 'Lorem ipsum has been 🌵',
    description:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a.',
    categories: ['Cactos', 'Cuidados', 'Informativo'],
    image: postImage1,
    publicationDate: '3 dias atrás',
    rate: 8.2,
  },
  {
    title: 'Lorem ipsum has been 🌲',
    description:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a.',
    categories: ['Cactos', 'Cuidados', 'Informativo'],
    image: postImage2,
    publicationDate: '3 dias atrás',
    rate: 8.2,
  },
  {
    title: 'Lorem ipsum has been 🌿',
    description:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a.',
    categories: ['Cactos', 'Cuidados', 'Informativo'],
    image: postImage3,
    publicationDate: '3 dias atrás',
    rate: 8.2,
  },
];

export const InformativeContentsComponent: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <Title>Conteúdos informativos</Title>
      {temporaryData.map((item, indexData) => (
        <TransparentContainer key={indexData}>
          <CardContainer activeOpacity={0.8} style={{ ...theme.shadows.sm }}>
            <CardContainerColumnContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardAuthor>Autor: John Legend</CardAuthor>
              <CardCategoriesContainer>
                <CardCategoriesTitle>Categorias:</CardCategoriesTitle>
                <CardCategoriesItemsContainer>
                  {item.categories.map((categoryText, indexCategory) => (
                    <CardCategoriesItemWrap key={indexCategory}>
                      <CardCategoriesItem>{categoryText}</CardCategoriesItem>
                      {item.categories.length === indexCategory + 1 ? null : (
                        <CardCategoriesItemPoint />
                      )}
                    </CardCategoriesItemWrap>
                  ))}
                </CardCategoriesItemsContainer>
              </CardCategoriesContainer>
            </CardContainerColumnContent>
            <CardContainerColumnImage>
              <CardImageBackground
                source={backgroundCardIlustration}
                resizeMode="center"
              />
              <CardImage source={item.image} resizeMode="center" />
            </CardContainerColumnImage>
            <CardFooterContainer>
              <CardFooterDateContainer>
                <CardFooterIcon
                  source={getIcon('calendar')}
                  resizeMode="center"
                />
                <CardFooterDateText>{item.publicationDate}</CardFooterDateText>
              </CardFooterDateContainer>
              <CardFooterRateContainer>
                <CardFooterIcon source={getIcon('rate')} resizeMode="center" />
                <CardFooterRateText>{item.rate}</CardFooterRateText>
              </CardFooterRateContainer>
            </CardFooterContainer>
          </CardContainer>
        </TransparentContainer>
      ))}
    </Container>
  );
};
