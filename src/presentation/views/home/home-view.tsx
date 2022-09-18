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
    });
  }

  render() {
    const { categories, articles, isArticleSearch } = this.state;
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
