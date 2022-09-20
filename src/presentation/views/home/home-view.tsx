import React from 'react';
import { HomeViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import {
  SearchInputComponent,
  SalutationComponent,
  CategoriesCarrouselComponent,
  InformativeContentsComponent,
} from './components';
import { Container, spacing } from './styles';
import { ArticleModel, CategoryModel } from '@/domain/models';

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
    };
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
    this.homeViewModel.handleGetCategories();
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
    });
  }

  render() {
    const {
      categories,
      articles,
      isArticleSearch,
      loadingArticles,
      loadingCategories,
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
          style={spacing.searchInput}
          onSubmit={(search) => this.homeViewModel.handleSearchArticles(search)}
        />
        {isArticleSearch ? null : (
          <CategoriesCarrouselComponent
            categories={categories}
            onSelectCategory={(categoryId) =>
              this.homeViewModel.handleGetArticles(categoryId)
            }
            loading={loadingCategories}
            style={spacing.carrousel}
          />
        )}
        <InformativeContentsComponent
          style={spacing.informativeContents}
          articles={articles}
          loading={loadingArticles}
          onPress={() => this.homeViewModel.handleNavigateToArticle()}
        />
      </Container>
    );
  }
}
