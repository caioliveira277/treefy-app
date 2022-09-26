import { FeedbackModel } from '@/domain/models';
import { BaseDataSource } from '@/data/data-sources/base-data-source';
import { FeedbacksRequest } from '@/@types/request';

export class FeedbackDataSource implements BaseDataSource {
  public data: FeedbacksRequest['data'];

  constructor(data: FeedbacksRequest['data']) {
    this.data = data;
  }

  public toModel(): FeedbackModel[] {
    return this.data.map((feedback) => ({
      id: feedback.id,
      ratingPoints: feedback.attributes.ratingPoints,
    }));
  }
}
