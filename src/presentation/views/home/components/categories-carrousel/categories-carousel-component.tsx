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
import { useEffect, useState } from 'react';

type ListItem = {
  id: number;
  title: string;
  image: string;
  active: boolean;
};

export interface CategoriesCarrouselComponentProps {
  style?: StyleProp<ViewStyle>;
  categories: CategoryModel[];
}

export const CategoriesCarrouselComponent: React.FC<
  CategoriesCarrouselComponentProps
> = ({ style, categories }) => {
  const theme = useTheme();
  const [list, setList] = useState<ListItem[]>([]);

  const handleFormatCategories = (categoriesData: CategoryModel[]) => {
    setList(
      categoriesData.map((category, index) => ({
        id: category.id,
        active: index === 0,
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
  };

  useEffect(() => {
    handleFormatCategories(categories);
  }, [categories]);
  return (
    <Container style={style}>
      <Title>Categorias</Title>
      <Corrousel horizontal={true} showsHorizontalScrollIndicator={false}>
        {list.map((item, index) => (
          <ItemContainer
            active={item.active}
            style={!index ? customStyle.firstItem : null}
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
        ))}
      </Corrousel>
    </Container>
  );
};
