import { useTheme } from 'styled-components/native';
import {
  Container,
  ItemContainer,
  Corrousel,
  Title,
  ItemImage,
  ItemText,
  ContainerShadow,
  ActivePoint,
  customStyle,
} from './styles';
import { StyleProp, ViewStyle } from 'react-native';
import { CategoryModel } from '@/domain/models';
import { CategoriesCarouselLoading } from './categories-carousel-loading';

export interface CategoriesCarrouselComponentProps {
  style?: StyleProp<ViewStyle>;
  categories: CategoryModel[];
  loading: boolean;
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

export const CategoriesCarrouselComponent: React.FC<
  CategoriesCarrouselComponentProps
> = ({ style, categories, onSelectCategory, loading, selectedCategoryId }) => {
  const theme = useTheme();

  const handleSelectItem = (id: number) => {
    onSelectCategory(id);
  };

  const isLast = (index: number) => index + 1 === categories.length;
  const isActive = (id: number) => id === selectedCategoryId;

  return (
    <Container style={style}>
      <Title>Categorias</Title>
      <Corrousel horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <CategoriesCarouselLoading />
        ) : (
          categories.map((item, index) => (
            <ItemContainer
              active={isActive(item.id)}
              style={isLast(index) ? customStyle.lastItem : customStyle.item}
              key={item.id}
            >
              <ContainerShadow
                style={{ ...theme.shadows.sm }}
                onPress={() => handleSelectItem(item.id)}
              >
                <ItemImage
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="center"
                />
              </ContainerShadow>
              <ItemText active={isActive(item.id)}>{item.title}</ItemText>
              {isActive(item.id) ? <ActivePoint /> : null}
            </ItemContainer>
          ))
        )}
      </Corrousel>
    </Container>
  );
};
