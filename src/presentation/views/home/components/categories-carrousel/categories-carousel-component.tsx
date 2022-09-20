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
import { useEffect, useRef, useState } from 'react';
import { CategoriesCarouselLoading } from './categories-carousel-loading';

type ListItem = {
  id: number;
  title: string;
  image: string;
  active: boolean;
};

export interface CategoriesCarrouselComponentProps {
  style?: StyleProp<ViewStyle>;
  categories: CategoryModel[];
  loading: boolean;
  onSelectCategory: (categoryId: number) => void;
}

export const CategoriesCarrouselComponent: React.FC<
  CategoriesCarrouselComponentProps
> = ({ style, categories, onSelectCategory, loading }) => {
  const theme = useTheme();
  const [list, setList] = useState<ListItem[]>([]);

  const handleFormatCategories = () => {
    setList(
      categories.map((category) => ({
        id: category.id,
        active: false,
        title: category.title,
        image: category.image,
      }))
    );
  };

  const handleSelectItem = (id: number) => {
    const newState = list.map((item) => {
      item.active = false;
      if (item.id === id) item.active = true;
      return item;
    });
    setList(newState);
    onSelectCategory(id);
  };

  useEffect(() => {
    handleFormatCategories();
  }, [categories]);

  const calledOnlyOnce = useRef(false);
  useEffect(() => {
    if (calledOnlyOnce.current || !list.length) return;

    handleSelectItem(list[0].id);
    calledOnlyOnce.current = true;
  }, [list]);

  const isLast = (index: number) => index + 1 === list.length;

  return (
    <Container style={style}>
      <Title>Categorias</Title>
      <Corrousel horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading ? (
          <CategoriesCarouselLoading />
        ) : (
          list.map((item, index) => (
            <ItemContainer
              active={item.active}
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
              <ItemText active={item.active}>{item.title}</ItemText>
              {item.active ? <ActivePoint /> : null}
            </ItemContainer>
          ))
        )}
      </Corrousel>
    </Container>
  );
};
