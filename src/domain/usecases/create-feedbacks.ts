import { FeedbackModel } from '@/domain/models';

export type CreateFeedbackParams = {
  ratingPoints: number;
  articleId: number;
  accessToken: string;
};

export interface CreateFeedbacks {
  create(params: CreateFeedbackParams): Promise<FeedbackModel>;
}
