import React from 'react';
import { HomeViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import {
  SalutationComponent,
  CategoriesCarrouselComponent,
  InformativeContentsComponent,
} from './components';
import { Container, spacing } from './styles';
import { ArticleModel, CategoryModel } from '@/domain/models';
import { SearchInputComponent } from '@/presentation/components';

export interface HomeViewProps
  extends NativeStackScreenProps<StackParamList, 'Home'> {
  homeViewModel: HomeViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface HomeViewState {
  categories: CategoryModel[];
  articles: ArticleModel[];
  isArticleSearch: boolean;
  loadingArticles: boolean;
  loadingCategories: boolean;
  selectedCategoryId: number | null;
  hideCategories: boolean;
}

export class HomeView
  extends React.Component<HomeViewProps, HomeViewState>
  implements BaseView
{
  private homeViewModel: HomeViewModel;

  constructor(props: HomeViewProps) {
    super(props);

    const { homeViewModel } = this.props;
    this.homeViewModel = homeViewModel;

    this.state = {
      categories: homeViewModel.categories,
      articles: homeViewModel.articles,
      isArticleSearch: homeViewModel.isArticleSearch,
      loadingArticles: homeViewModel.loadingArticles,
      loadingCategories: homeViewModel.loadingCategories,
      selectedCategoryId: homeViewModel.selectedCategoryId,
      hideCategories: homeViewModel.hideCategories,
    };
  }

  public async componentDidMount(): Promise<void> {
    this.homeViewModel.attachView(this);
    await this.homeViewModel.handleGetCategories();
    await this.homeViewModel.handleGetArticles();
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      categories: this.homeViewModel.categories,
      articles: this.homeViewModel.articles,
      isArticleSearch: this.homeViewModel.isArticleSearch,
      loadingArticles: this.homeViewModel.loadingArticles,
      loadingCategories: this.homeViewModel.loadingCategories,
      selectedCategoryId: this.homeViewModel.selectedCategoryId,
      hideCategories: this.homeViewModel.hideCategories,
    });
  }

  render() {
    const {
      categories,
      articles,
      isArticleSearch,
      loadingArticles,
      loadingCategories,
      selectedCategoryId,
      hideCategories,
    } = this.state;
    return (
      <Container>
        <SalutationComponent
          style={spacing.salutation}
          name={
            this.props.contextConsumer?.authentication?.authenticatedUser
              .name || ''
          }
        />
        <SearchInputComponent
          titleFontSize="xl"
          style={spacing.searchInput}
          onSubmit={(search) => this.homeViewModel.handleSearchArticles(search)}
          placeholder="Encontre conteúdos relacionados"
          infoMessage="Ex: Como cuidar, dicas, girassóis, adubo..."
        />
        {isArticleSearch ||
        (!loadingCategories && !categories.length) ? null : (
          <CategoriesCarrouselComponent
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            hideCategories={hideCategories}
            onSelectCategory={(categoryId) => {
              this.homeViewModel.handleSelectCategory(categoryId);
              this.homeViewModel.handleGetArticles();
            }}
            onHideCategories={(state) =>
              this.homeViewModel.handleChangeHideCategoriesState(state)
            }
            onLoadMoreData={(page) =>
              this.homeViewModel.handleGetCategories(page)
            }
            loading={loadingCategories}
          />
        )}
        <InformativeContentsComponent
          style={spacing.informativeContents}
          articles={articles}
          loading={loadingArticles}
          onPress={(articleId) =>
            this.homeViewModel.handleNavigateToArticle(articleId)
          }
          onLoadMoreData={(page) => this.homeViewModel.handleGetArticles(page)}
          onMoveScroll={(positionY) =>
            this.homeViewModel.handleChangeHideCategoriesState(positionY > 300)
          }
        />
      </Container>
    );
  }
}
