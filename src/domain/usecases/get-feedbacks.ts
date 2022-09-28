import { FeedbackModel } from '@/domain/models';

export type GetFeedbacksByArticleIdParams = {
  articleId: number;
  accessToken: string;
};

export type GetFeedbacksQuantityGivenInArticles = {
  accessToken: string;
};

export interface GetFeedbacks {
  byArticleId(params: GetFeedbacksByArticleIdParams): Promise<FeedbackModel[]>;
  quantityGivenInArticles(
    params: GetFeedbacksQuantityGivenInArticles
  ): Promise<number>;
}
