import { ArticleModel } from '@/domain/models';
import { formatDateTime, getIcon } from '@/presentation/utils';
import {
  Container,
  CategoryContainer,
  CategoryListContainer,
  Label,
  CategoryItem,
  Point,
  RateContainer,
  RateIcon,
  RateText,
  DateContainer,
  DateIconTextContainer,
  DateIcon,
  DateText,
  CategoryItemContainer,
} from './styles';

export interface StatusComponentProps {
  categories: ArticleModel['categories'];
  averageRating: ArticleModel['averageRating'];
  publishedAt: ArticleModel['publishedAt'];
}

export const StatusComponent: React.FC<StatusComponentProps> = ({
  averageRating,
  categories,
  publishedAt,
}) => {
  const isLastCategory = (index: number) => index + 1 === categories.length;

  return (
    <Container>
      <CategoryContainer>
        <Label>Categorias:</Label>
        <CategoryListContainer>
          {categories.map((category, index) => (
            <CategoryItemContainer key={category.id}>
              <CategoryItem>{category.title}</CategoryItem>
              {isLastCategory(index) ? null : <Point />}
            </CategoryItemContainer>
          ))}
        </CategoryListContainer>
      </CategoryContainer>
      {averageRating !== null ? (
        <RateContainer>
          <RateIcon source={getIcon('rate')} resizeMode="center" />
          <RateText>{averageRating}</RateText>
        </RateContainer>
      ) : null}
      <DateContainer>
        <Label>Publicado em:</Label>
        <DateIconTextContainer>
          <DateIcon source={getIcon('calendar')} resizeMode="center" />
          <DateText>{formatDateTime(publishedAt)}</DateText>
        </DateIconTextContainer>
      </DateContainer>
    </Container>
  );
};
