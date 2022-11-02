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
  loadingArticles: boolean;
  loadingCategories: boolean;
  selectedCategoryId: number | null;
  hideCategories: boolean;
  search: string;
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
      loadingArticles: homeViewModel.loadingArticles,
      loadingCategories: homeViewModel.loadingCategories,
      selectedCategoryId: homeViewModel.selectedCategoryId,
      hideCategories: homeViewModel.hideCategories,
      search: homeViewModel.search,
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
      loadingArticles: this.homeViewModel.loadingArticles,
      loadingCategories: this.homeViewModel.loadingCategories,
      selectedCategoryId: this.homeViewModel.selectedCategoryId,
      hideCategories: this.homeViewModel.hideCategories,
      search: this.homeViewModel.search,
    });
  }

  render() {
    const {
      categories,
      articles,
      loadingArticles,
      loadingCategories,
      selectedCategoryId,
      hideCategories,
      search,
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
          onSubmit={(searchValue) =>
            this.homeViewModel.handleSearchArticles(searchValue)
          }
          placeholder="Encontre conteúdos relacionados"
          infoMessage="Ex: Como cuidar, dicas, girassóis, adubo..."
        />
        {search || (!loadingCategories && !categories.length) ? null : (
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
          articles={articles}
          loading={loadingArticles}
          selectedCategoryId={selectedCategoryId}
          search={search}
          onPress={(articleId) =>
            this.homeViewModel.handleNavigateToArticle(articleId)
          }
          onLoadMoreData={(page) =>
            search
              ? this.homeViewModel.handleSearchArticles(search, page)
              : this.homeViewModel.handleGetArticles(page)
          }
          onMoveScroll={(positionY) =>
            this.homeViewModel.handleChangeHideCategoriesState(positionY > 100)
          }
        />
      </Container>
    );
  }
}
