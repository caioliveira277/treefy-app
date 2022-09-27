import { ArticleViewModel } from './article-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import {
  CreateFeedbacks,
  CreateViewedArticles,
  GetArticles,
  GetFeedbacks,
} from '@/domain/usecases';
import { ArticleModel, FeedbackModel } from '@/domain/models';

export class ArticleViewModelImpl
  extends BaseViewModelImpl
  implements ArticleViewModel
{
  public readonly getArticles: GetArticles;

  public readonly getFeedbacks: GetFeedbacks;

  public readonly createFeedbacks: CreateFeedbacks;

  public readonly createViewedArticles: CreateViewedArticles;

  public article: ArticleModel;

  public feedback: FeedbackModel | null;

  public feedbackLoading: boolean;

  public getFeedbackLoading: boolean;

  public contentLoading: boolean;

  constructor(
    getArticles: GetArticles,
    getFeedbacks: GetFeedbacks,
    createFeedbacks: CreateFeedbacks,
    createViewedArticles: CreateViewedArticles
  ) {
    super();
    this.getArticles = getArticles;
    this.getFeedbacks = getFeedbacks;
    this.createFeedbacks = createFeedbacks;
    this.createViewedArticles = createViewedArticles;

    this.article = {} as ArticleModel;
    this.feedback = null;

    this.feedbackLoading = false;
    this.getFeedbackLoading = true;
    this.contentLoading = true;
  }

  private handleChangeFeedbackLoading(state: boolean): void {
    this.feedbackLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleChangeGetFeedbackLoading(state: boolean): void {
    this.getFeedbackLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleChangeContentLoading(state: boolean): void {
    this.contentLoading = state;
    this.notifyViewAboutChanges();
  }

  public async handleSaveFeedback(ratingPoints: number): Promise<void> {
    this.handleChangeFeedbackLoading(true);

    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const feedback = await this.createFeedbacks.create({
      articleId,
      accessToken: user?.accessToken || '',
      ratingPoints,
    });

    if (feedback.id) {
      this.feedback = feedback;
    }

    setTimeout(() => {
      this.handleChangeFeedbackLoading(false);
    }, 500);
  }

  public async handleGetArticle(): Promise<void> {
    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const article = await this.getArticles.oneById({ articleId });
    this.article = article;

    this.handleChangeContentLoading(false);
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

    this.handleChangeGetFeedbackLoading(false);
  }

  public async handleSaveArticleAsViewed(): Promise<void> {
    const articleId = (
      this.baseView?.props.route.params as StackParamList['Article']
    ).articleId;

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    await this.createViewedArticles.create({
      articleId,
      accessToken: user?.accessToken || '',
    });
  }
}
