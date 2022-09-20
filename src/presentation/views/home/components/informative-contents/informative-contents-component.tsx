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
import { formatDateTime, getIcon } from '@/presentation/utils';
import { useTheme } from 'styled-components';
import backgroundCardIlustration from '@assets/images/background-card-ilustration.png';
import { StyleProp, ViewStyle } from 'react-native';
import { ArticleModel } from '@/domain/models';
import { InformativeContentsLoading } from './informative-contents-loading';
import { InformativeContentsEmpty } from './informative-contents-empty';

export interface InformativeContentsComponentProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  articles: ArticleModel[];
  loading: boolean;
}

export const InformativeContentsComponent: React.FC<
  InformativeContentsComponentProps
> = ({ style, onPress, articles, loading }) => {
  const theme = useTheme();

  return (
    <Container style={style}>
      <Title>Conteúdos informativos</Title>

      {loading ? (
        <InformativeContentsLoading />
      ) : !articles.length ? (
        <InformativeContentsEmpty />
      ) : (
        articles.map((article) => (
          <TransparentContainer key={article.id}>
            <CardContainer
              activeOpacity={0.8}
              style={{ ...theme.shadows.sm }}
              onPress={() => onPress()}
            >
              <CardContainerColumnContent>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
                <CardAuthor>Autor: {article.author.name}</CardAuthor>
                <CardCategoriesContainer>
                  <CardCategoriesTitle>Categorias:</CardCategoriesTitle>
                  <CardCategoriesItemsContainer>
                    {article.categories.map((category, categoryIndex) => (
                      <CardCategoriesItemWrap key={category.id}>
                        <CardCategoriesItem>
                          {category.title}
                        </CardCategoriesItem>
                        {article.categories.length ===
                        categoryIndex + 1 ? null : (
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
                <CardImage
                  source={{
                    uri: article.thumbnail,
                  }}
                  resizeMode="center"
                />
              </CardContainerColumnImage>
              <CardFooterContainer>
                <CardFooterDateContainer>
                  <CardFooterIcon
                    source={getIcon('calendar')}
                    resizeMode="center"
                  />
                  <CardFooterDateText>
                    {formatDateTime(article.publishedAt)}
                  </CardFooterDateText>
                </CardFooterDateContainer>
                <CardFooterRateContainer>
                  <CardFooterIcon
                    source={getIcon('rate')}
                    resizeMode="center"
                  />
                  <CardFooterRateText>
                    {article.averageRating === null
                      ? '-'
                      : article.averageRating}
                  </CardFooterRateText>
                </CardFooterRateContainer>
              </CardFooterContainer>
            </CardContainer>
          </TransparentContainer>
        ))
      )}
    </Container>
  );
};
