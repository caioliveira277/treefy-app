import {
  CreateFeedbacksCreateParams,
  CreateFeedbacks,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { FeedbackModel } from '@/domain/models';
import { FeedbackRequest } from '@/@types/request';
import { FeedbackDataSource } from '@/data/data-sources';

export class RemoteCreateFeedbacks implements CreateFeedbacks {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/feedbacks`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatBody(params: Record<string, any>) {
    const formatedBody: { data: { [key: string]: string | number } } = {
      data: {
        article: params?.articleId,
        ratingPoints: params?.ratingPoints,
      },
    };

    return formatedBody;
  }

  public async create(
    params: CreateFeedbacksCreateParams
  ): Promise<FeedbackModel> {
    try {
      const response = await this.httpClient.request<FeedbackRequest>({
        method: 'POST',
        url: this.baseUrl,
        body: this.formatBody(params),
        headers: {
          authorization: params.accessToken,
        },
      });

      if (response.statusCode === HttpStatusCode.ok && response.body?.data) {
        return new FeedbackDataSource([response.body.data]).toModel()[0];
      }
    } catch (error) {
      return {} as FeedbackModel;
    }
    return {} as FeedbackModel;
  }
}
