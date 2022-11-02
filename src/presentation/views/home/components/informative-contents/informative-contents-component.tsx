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
  styles,
} from './styles';
import { formatDateTime, getIcon } from '@/presentation/utils';
import { useTheme } from 'styled-components';
import backgroundCardIlustration from '@assets/images/background-card-ilustration.png';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import { ArticleModel } from '@/domain/models';
import { InformativeContentsLoading } from './informative-contents-loading';
import {
  EmptyContentComponent,
  LoadingOverlayComponent,
} from '@/presentation/components';
import { useEffect, useState } from 'react';

export interface InformativeContentsComponentProps {
  style?: StyleProp<ViewStyle>;
  onPress: (articleId: number) => void;
  articles: ArticleModel[];
  loading: boolean;
  onLoadMoreData: (page: number) => void;
  onMoveScroll?: (positionY: number) => void;
  selectedCategoryId: number | null;
  search: string;
}

export const InformativeContentsComponent: React.FC<
  InformativeContentsComponentProps
> = ({
  style,
  onPress,
  articles,
  loading,
  onMoveScroll = () => null,
  onLoadMoreData,
  selectedCategoryId,
  search,
}) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId, search]);

  return (
    <Container style={style}>
      <Title>Conteúdos informativos</Title>

      {loading && !articles.length ? (
        <InformativeContentsLoading />
      ) : !loading && !articles.length ? (
        <EmptyContentComponent
          style={styles.empty}
          description="Oops! Nenhum conteúdo encontrado :("
        />
      ) : (
        <View style={{ flex: 1 }}>
          {loading ? <LoadingOverlayComponent /> : null}
          <FlatList
            data={articles}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.containerList}
            initialNumToRender={3}
            extraData={articles}
            onEndReached={() => {
              const page = currentPage + 1;
              setCurrentPage(page);
              onLoadMoreData(page);
            }}
            onScroll={({ nativeEvent }) =>
              onMoveScroll(nativeEvent.contentOffset.y)
            }
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <TransparentContainer>
                <CardContainer
                  activeOpacity={0.8}
                  style={{ ...theme.shadows.sm }}
                  onPress={() => onPress(item.id)}
                >
                  <CardContainerColumnContent>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <CardAuthor>Autor: {item.author.name}</CardAuthor>
                    <CardCategoriesContainer>
                      <CardCategoriesTitle>Categorias:</CardCategoriesTitle>
                      <CardCategoriesItemsContainer>
                        {item.categories.map((category, categoryIndex) => (
                          <CardCategoriesItemWrap key={category.id}>
                            <CardCategoriesItem>
                              {category.title}
                            </CardCategoriesItem>
                            {item.categories.length ===
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
                        uri: item.thumbnail,
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
                        {formatDateTime(item.publishedAt)}
                      </CardFooterDateText>
                    </CardFooterDateContainer>
                    <CardFooterRateContainer>
                      <CardFooterIcon
                        source={getIcon('rate')}
                        resizeMode="center"
                      />
                      <CardFooterRateText>
                        {item.averageRating === null ? '-' : item.averageRating}
                      </CardFooterRateText>
                    </CardFooterRateContainer>
                  </CardFooterContainer>
                </CardContainer>
              </TransparentContainer>
            )}
          />
        </View>
      )}
    </Container>
  );
};
