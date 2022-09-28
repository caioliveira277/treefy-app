import {
  CreateViewedArticles,
  CreateViewedArticlesCreateParams,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { ViewedArticleRequest } from '@/@types/request';

export class RemoteCreateViewedArticles implements CreateViewedArticles {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/viewed-articles`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatBody(params: Record<string, any>) {
    const formatedBody: { data: { [key: string]: string | number } } = {
      data: {
        article: params?.articleId,
      },
    };

    return formatedBody;
  }

  public async create(
    params: CreateViewedArticlesCreateParams
  ): Promise<boolean> {
    try {
      const response = await this.httpClient.request<ViewedArticleRequest>({
        method: 'POST',
        url: this.baseUrl,
        body: this.formatBody(params),
        headers: {
          authorization: params.accessToken,
        },
      });

      if (response.statusCode === HttpStatusCode.ok && response.body?.data) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}
