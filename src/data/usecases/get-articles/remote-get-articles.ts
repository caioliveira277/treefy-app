import {
  GetArticlesAllByCategoryIdParams,
  GetArticlesAllBySearchParams,
  GetArticles,
  GetArticlesOneByIdParams,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { ArticleModel } from '@/domain/models';
import { ArticleRequest, ArticlesRequest } from '@/@types/request';
import { ArticleDataSource } from '@/data/data-sources';

export class RemoteGetArticles implements GetArticles {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/articles`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatParams(params: Record<string, any>, withContent: boolean) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'populate[banner][fields]': 'url',
      'populate[thumbnail][fields]': 'url',
      'populate[categories][fields][0]': 'id',
      'populate[categories][fields][1]': 'title',
      'populate[updatedBy][fields][0]': 'firstname',
      'populate[updatedBy][fields][1]': 'lastname',
      'populate[updatedBy][fields][2]': 'createdAt',
      'sort[0]': 'publishedAt:desc',
    };

    if (!withContent) formatedParams['!fields'] = 'content';

    if (params.categoryId)
      formatedParams['filters[categories][id][$in][0]'] = params.categoryId;

    if (params.search) {
      formatedParams['filters[$or][0][title][$contains]'] = params.search;
      formatedParams['filters[$or][1][description][$contains]'] = params.search;
    }

    return formatedParams;
  }

  public async allByCategoryId(
    params: GetArticlesAllByCategoryIdParams
  ): Promise<ArticleModel[]> {
    try {
      const response = await this.httpClient.request<ArticlesRequest>({
        method: 'GET',
        url: this.baseUrl,
        params: this.formatParams(params, false),
      });
      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data?.length
      ) {
        return new ArticleDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  public async allBySearch(
    params: GetArticlesAllBySearchParams
  ): Promise<ArticleModel[]> {
    try {
      const response = await this.httpClient.request<ArticlesRequest>({
        method: 'GET',
        url: this.baseUrl,
        params: this.formatParams(params, false),
      });
      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data?.length
      ) {
        return new ArticleDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  public async oneById(
    params: GetArticlesOneByIdParams
  ): Promise<ArticleModel> {
    try {
      const response = await this.httpClient.request<ArticleRequest>({
        method: 'GET',
        url: `${this.baseUrl}/${params.articleId}`,
        params: this.formatParams(params, true),
      });
      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data.id
      ) {
        const articleModel = new ArticleDataSource([
          response.body.data,
        ]).toModel()[0];

        articleModel.content = JSON.parse(articleModel.content as string);

        return articleModel;
      }
      return {} as ArticleModel;
    } catch (error) {
      return {} as ArticleModel;
    }
  }
}
