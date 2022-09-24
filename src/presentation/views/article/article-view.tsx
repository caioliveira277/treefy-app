import React from 'react';
import { ArticleViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import {
  Banner,
  Container,
  SafeContainer,
  Title,
  BannerContainer,
} from './styles';
import { Dimensions } from 'react-native';
import { ContentComponent, RateComponent, StatusComponent } from './components';
import { ArticleModel } from '@/domain/models';
import { currentTheme } from '@/presentation/themes';
import { ContentBlock } from '@/@types/content-block';

export interface ArticleViewProps
  extends NativeStackScreenProps<StackParamList, 'Article'> {
  articleViewModel: ArticleViewModel;
}

export interface ArticleViewState {
  webheight: number;
  article: ArticleModel;
}

export class ArticleView
  extends React.Component<ArticleViewProps, ArticleViewState>
  implements BaseView
{
  private articleViewModel: ArticleViewModel;

  constructor(props: ArticleViewProps) {
    super(props);

    const { articleViewModel } = this.props;
    this.articleViewModel = articleViewModel;

    this.state = {
      webheight: Dimensions.get('window').height,
      article: articleViewModel.article,
    };
  }

  public componentDidMount(): void {
    this.articleViewModel.attachView(this);
    this.articleViewModel.handleGetArticle();
  }

  public componentWillUnmount(): void {
    this.articleViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      article: this.articleViewModel.article,
    });
  }

  render() {
    const { article } = this.state;
    return article.id ? (
      <Container>
        <Title>{article.title}</Title>
        <BannerContainer style={{ ...currentTheme.shadows.sm }}>
          <Banner source={{ uri: article.banner }} resizeMode="cover" />
        </BannerContainer>
        <SafeContainer>
          <StatusComponent
            categories={article.categories}
            publishedAt={article.publishedAt}
            averageRating={article.averageRating}
          />
          <ContentComponent content={article.content as ContentBlock} />
          <RateComponent />
        </SafeContainer>
      </Container>
    ) : null;
  }
}
