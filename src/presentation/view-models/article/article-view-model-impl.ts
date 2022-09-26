import { ArticleViewModel } from './article-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { GetArticles, GetFeedbacks } from '@/domain/usecases';
import { ArticleModel, FeedbackModel } from '@/domain/models';

export class ArticleViewModelImpl
  extends BaseViewModelImpl
  implements ArticleViewModel
{
  public readonly getArticles: GetArticles;

  public readonly getFeedbacks: GetFeedbacks;

  public article: ArticleModel;

  public feedback: FeedbackModel | null;

  constructor(getArticles: GetArticles, getFeedbacks: GetFeedbacks) {
    super();
    this.getArticles = getArticles;
    this.getFeedbacks = getFeedbacks;

    this.article = {} as ArticleModel;
    this.feedback = null;
  }

  public async handleGetArticle(): Promise<void> {
    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const article = await this.getArticles.oneById({ articleId });
    this.article = article;

    this.notifyViewAboutChanges();
  }

  public async handleGetFeedback(): Promise<void> {
    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const feedbacks = await this.getFeedbacks.byArticleId({
      articleId,
      accessToken: user?.accessToken || '',
    });
    this.feedback = feedbacks[0];

    this.notifyViewAboutChanges();
  }
}
