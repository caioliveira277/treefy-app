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
  Icon,
  Button,
} from './styles';
import { FlatList, StyleProp, ViewStyle } from 'react-native';
import { CategoryModel } from '@/domain/models';
import { CategoriesCarouselLoading } from './categories-carousel-loading';
import { useState } from 'react';
import {
  AnimatedHeightComponent,
  LoadingOverlayComponent,
} from '@/presentation/components';
import { MotiView } from 'moti';
import { getIcon } from '@/presentation/utils';

export interface CategoriesCarrouselComponentProps {
  style?: StyleProp<ViewStyle>;
  categories: CategoryModel[];
  loading: boolean;
  hideCategories?: boolean;
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
  onLoadMoreData: (page: number) => void;
  onHideCategories: (state: boolean) => void;
}

export const CategoriesCarrouselComponent: React.FC<
  CategoriesCarrouselComponentProps
> = ({
  style,
  categories,
  onSelectCategory,
  loading,
  selectedCategoryId,
  onLoadMoreData,
  hideCategories = false,
  onHideCategories,
}) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectItem = (id: number) => {
    onSelectCategory(id);
  };

  const isLast = (index: number) => index + 1 === categories.length;
  const isActive = (id: number) => id === selectedCategoryId;

  return (
    <Container style={style}>
      <Button onPress={() => onHideCategories(!hideCategories)}>
        <Title>Categorias</Title>
        <MotiView
          transition={{
            type: 'timing',
          }}
          animate={{
            rotateZ: hideCategories ? '90deg' : '0deg',
          }}
        >
          <Icon source={getIcon('up')} resizeMode="center" />
        </MotiView>
      </Button>
      <AnimatedHeightComponent hide={hideCategories}>
        {loading && !categories.length ? (
          <Corrousel horizontal={true}>
            <CategoriesCarouselLoading />
          </Corrousel>
        ) : (
          <>
            {loading ? <LoadingOverlayComponent adjustYPosition={25} /> : null}
            <FlatList
              contentContainerStyle={{ paddingBottom: 8 }}
              data={categories}
              initialNumToRender={5}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              onEndReached={() => {
                const page = currentPage + 1;
                setCurrentPage(page);
                onLoadMoreData(page);
              }}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }) => (
                <ItemContainer
                  active={isActive(item.id)}
                  style={
                    isLast(index) ? customStyle.lastItem : customStyle.item
                  }
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
              )}
            />
          </>
        )}
      </AnimatedHeightComponent>
    </Container>
  );
};
