import { ArticleModel, FeedbackModel } from '@/domain/models';
import { CreateFeedbacks, GetArticles, GetFeedbacks } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ArticleViewModel extends BaseViewModel {
  getArticles: GetArticles;
  getFeedbacks: GetFeedbacks;
  createFeedbacks: CreateFeedbacks;

  article: ArticleModel;
  feedback: FeedbackModel | null;

  feedbackLoading: boolean;
  contentLoading: boolean;

  handleSaveFeedback(ratingPoints: number): Promise<void>;
  handleGetArticle(): Promise<void>;
  handleGetFeedback(): Promise<void>;
}
