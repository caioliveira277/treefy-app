import { ArticleModel, FeedbackModel } from '@/domain/models';
import {
  CreateFeedbacks,
  CreateViewedArticles,
  GetArticles,
  GetFeedbacks,
} from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ArticleViewModel extends BaseViewModel {
  getArticles: GetArticles;
  getFeedbacks: GetFeedbacks;
  createFeedbacks: CreateFeedbacks;
  createViewedArticles: CreateViewedArticles;

  article: ArticleModel;
  feedback: FeedbackModel | null;

  feedbackLoading: boolean;
  getFeedbackLoading: boolean;
  contentLoading: boolean;

  handleSaveFeedback(ratingPoints: number): Promise<void>;
  handleGetArticle(): Promise<void>;
  handleGetFeedback(): Promise<void>;
  handleSaveArticleAsViewed(): Promise<void>;
}
