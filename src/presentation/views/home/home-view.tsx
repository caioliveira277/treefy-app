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
import { AccountModel, ArticleModel, CategoryModel } from '@/domain/models';

export interface HomeViewProps
  extends NativeStackScreenProps<StackParamList, 'Home'> {
  homeViewModel: HomeViewModel;
}

export interface HomeViewState {
  categories: CategoryModel[];
  articles: ArticleModel[];
  isArticleSearch: boolean;
  authenticatedUser: AccountModel;
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
      authenticatedUser: homeViewModel.authenticatedUser,
    };
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
    this.homeViewModel.handleGetCategories();
    this.homeViewModel.handleGetAuthenticatedUser();
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  onViewModelChanged(): void {
    this.setState({
      categories: this.homeViewModel.categories,
      articles: this.homeViewModel.articles,
      isArticleSearch: this.homeViewModel.isArticleSearch,
      authenticatedUser: this.homeViewModel.authenticatedUser,
    });
  }

  render() {
    const { categories, articles, isArticleSearch, authenticatedUser } =
      this.state;
    return (
      <Container>
        <SalutationComponent
          style={spacing.salutation}
          name={authenticatedUser.name}
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
            style={spacing.carrousel}
          />
        )}
        <InformativeContentsComponent
          style={spacing.informativeContents}
          articles={articles}
          onPress={() => this.homeViewModel.handleNavigateToArticle()}
        />
      </Container>
    );
  }
}
