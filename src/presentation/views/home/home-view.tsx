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
import { CategoryModel } from '@/domain/models';

export interface HomeViewProps
  extends NativeStackScreenProps<StackParamList, 'Home'> {
  homeViewModel: HomeViewModel;
}

export interface HomeViewState {
  categories: CategoryModel[];
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
    };
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
    this.homeViewModel.handleGetCategories();
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  onViewModelChanged(): void {
    this.setState({
      categories: this.homeViewModel.categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <Container>
        <SalutationComponent style={spacing.salutation} />
        <SearchInputComponent style={spacing.searchInput} />
        <CategoriesCarrouselComponent
          categories={categories}
          style={spacing.carrousel}
        />
        <InformativeContentsComponent
          style={spacing.informativeContents}
          onPress={() => this.homeViewModel.handleNavigateToArticle()}
        />
      </Container>
    );
  }
}
