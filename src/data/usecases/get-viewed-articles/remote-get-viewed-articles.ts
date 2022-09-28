import {
  GetViewedArticles,
  GetViewedArticlesQuantityByUserParams,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { ViewedArticlesRequest } from '@/@types/request';

export class RemoteGetViewedArticles implements GetViewedArticles {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/viewed-articles`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 1,
      'fields[0]': 'id',
      'filters[article]': params?.articleId,
    };

    return formatedParams;
  }

  public async quantityByUser(
    params: GetViewedArticlesQuantityByUserParams
  ): Promise<number> {
    try {
      const response = await this.httpClient.request<ViewedArticlesRequest>({
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
        return response.body.meta.pagination.total;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }
}
