import { FeedbackModel } from '@/domain/models';

export type CreateFeedbacksCreateParams = {
  ratingPoints: number;
  articleId: number;
  accessToken: string;
};

export interface CreateFeedbacks {
  create(params: CreateFeedbacksCreateParams): Promise<FeedbackModel>;
}
