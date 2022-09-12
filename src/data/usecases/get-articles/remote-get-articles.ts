import { GetByCategoryIdParams, GetArticles } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { ArticleModel } from '@/domain/models';
import { ArticlesRequest } from '@/@types/request';

export class RemoteGetArticles implements GetArticles {
  private readonly httpClient: HttpClient;

  private readonly url = `${process.env.API_BASE_URL}/api/articles`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatUrlImage(imageUrl: string) {
    return `${process.env.API_BASE_URL}${imageUrl}`;
  }

  private formatParams(params: GetByCategoryIdParams, withContent: boolean) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'populate[banner][fields]': 'url',
      'populate[thumbnail][fields]': 'url',
      'populate[categories][fields][0]': 'id',
      'populate[categories][fields][1]': 'title',
      'populate[updatedBy][fields][0]': 'firstname',
      'populate[updatedBy][fields][1]': 'lastname',
    };
    if (!withContent) formatedParams['!fields'] = 'content';
    return formatedParams;
  }

  public async allByCategoryId(
    params: GetByCategoryIdParams
  ): Promise<ArticleModel[]> {
    const response = await this.httpClient.request<ArticlesRequest>({
      method: 'GET',
      url: this.url,
      params: {
        ...this.formatParams(params, false),
        'filters[categories][id][$contains]': params.categoryId,
      },
    });
    if (
      response.statusCode === HttpStatusCode.ok &&
      response?.body?.data?.length
    ) {
      return response.body.data.map((article) => ({
        id: article.id,
        title: article.attributes.title,
        description: article.attributes.description,
        content: '',
        categories: article.attributes.categories.data.map((category) => ({
          id: category.id,
          title: category.attributes.title,
        })),
        banner: this.formatUrlImage(
          article.attributes.banner.data.attributes.url
        ),
        thumbnail: this.formatUrlImage(
          article.attributes.thumbnail.data.attributes.url
        ),
        author: {
          name: `${article.attributes.updatedBy.data.attributes.firstname} ${article.attributes.updatedBy.data.attributes.lastname}`,
        },
        publishedAt: new Date(article.attributes.publishedAt),
      }));
    }
    return [];
  }
}
