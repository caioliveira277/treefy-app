import { FeedbackModel } from '@/domain/models';

export type GetByArticleIdFeedbackParams = {
  articleId: number;
  accessToken: string;
};

export interface GetFeedbacks {
  byArticleId(params: GetByArticleIdFeedbackParams): Promise<FeedbackModel[]>;
}
