import { GetFeedbacksByArticleIdParams, GetFeedbacks } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { FeedbackModel } from '@/domain/models';
import { FeedbacksRequest } from '@/@types/request';
import { FeedbackDataSource } from '@/data/data-sources';

export class RemoteGetFeedbacks implements GetFeedbacks {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/feedbacks`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'fields[0]': 'ratingPoints',
      'filters[article]': params?.articleId,
    };

    return formatedParams;
  }

  public async byArticleId(
    params: GetFeedbacksByArticleIdParams
  ): Promise<FeedbackModel[]> {
    try {
      const response = await this.httpClient.request<FeedbacksRequest>({
        method: 'GET',
        url: this.baseUrl,
        params: this.formatParams(params),
        headers: {
          authorization: params.accessToken,
        },
      });

      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data?.length
      ) {
        return new FeedbackDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
