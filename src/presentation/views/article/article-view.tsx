import React from 'react';
import { ArticleViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, SafeContainer } from './styles';
import { Dimensions } from 'react-native';
import {
  AuthorComponent,
  ContentComponent,
  HeaderComponent,
  RateComponent,
  StatusComponent,
} from './components';
import { ArticleModel, FeedbackModel } from '@/domain/models';
import { ContentBlock } from '@/@types/content-block';
import { PageLoadingComponent } from '@/presentation/components';

export interface ArticleViewProps
  extends NativeStackScreenProps<StackParamList, 'Article'> {
  articleViewModel: ArticleViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface ArticleViewState {
  webheight: number;
  article: ArticleModel;
  feedback: FeedbackModel | null;
  feedbackLoading: boolean;
  getFeedbackLoading: boolean;
  contentLoading: boolean;
}

export class ArticleView
  extends React.Component<ArticleViewProps, ArticleViewState>
  implements BaseView
{
  private articleViewModel: ArticleViewModel;

  private timeToSaveAsViewed?: ReturnType<typeof setTimeout>;

  constructor(props: ArticleViewProps) {
    super(props);

    const { articleViewModel } = this.props;
    this.articleViewModel = articleViewModel;

    this.state = {
      webheight: Dimensions.get('window').height,
      article: articleViewModel.article,
      feedback: articleViewModel.feedback,
      feedbackLoading: articleViewModel.feedbackLoading,
      getFeedbackLoading: articleViewModel.getFeedbackLoading,
      contentLoading: articleViewModel.contentLoading,
    };
  }

  public componentDidMount(): void {
    this.articleViewModel.attachView(this);
    this.articleViewModel.handleGetArticle();
    this.articleViewModel.handleGetFeedback();

    this.timeToSaveAsViewed = setTimeout(() => {
      this.articleViewModel.handleSaveArticleAsViewed();
    }, 10000);
  }

  public componentWillUnmount(): void {
    this.articleViewModel.detachView();
    clearTimeout(this.timeToSaveAsViewed);
  }

  public onViewModelChanged(): void {
    this.setState({
      article: this.articleViewModel.article,
      feedback: this.articleViewModel.feedback,
      feedbackLoading: this.articleViewModel.feedbackLoading,
      getFeedbackLoading: this.articleViewModel.getFeedbackLoading,
      contentLoading: this.articleViewModel.contentLoading,
    });
  }

  render() {
    const {
      article,
      feedback,
      contentLoading,
      feedbackLoading,
      getFeedbackLoading,
    } = this.state;

    return (
      <>
        {contentLoading ? null : (
          <Container>
            <HeaderComponent title={article.title} banner={article.banner} />
            <SafeContainer>
              <StatusComponent
                categories={article.categories}
                publishedAt={article.publishedAt}
                averageRating={article.averageRating}
              />
              <ContentComponent content={article.content as ContentBlock} />
              <AuthorComponent
                name={article.author?.name}
                createdAt={article.author?.createdAt}
              />
              <RateComponent
                ratingPoints={feedback?.ratingPoints || null}
                onSelectPoints={(points) =>
                  this.articleViewModel.handleSaveFeedback(points)
                }
              />
            </SafeContainer>
          </Container>
        )}
        {feedbackLoading || contentLoading || getFeedbackLoading ? (
          <PageLoadingComponent />
        ) : null}
      </>
    );
  }
}
