import { ArticleModel, FeedbackModel } from '@/domain/models';
import { GetArticles, GetFeedbacks } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ArticleViewModel extends BaseViewModel {
  getArticles: GetArticles;
  getFeedbacks: GetFeedbacks;

  article: ArticleModel;
  feedback: FeedbackModel | null;

  handleGetArticle(): Promise<void>;
  handleGetFeedback(): Promise<void>;
}
