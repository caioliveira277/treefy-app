import { FeedbackModel } from '@/domain/models';

export type GetFeedbacksByArticleIdParams = {
  articleId: number;
  accessToken: string;
};

export interface GetFeedbacks {
  byArticleId(params: GetFeedbacksByArticleIdParams): Promise<FeedbackModel[]>;
}
