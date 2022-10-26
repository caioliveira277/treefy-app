import {
  GetCategoriesAllCategoryParams,
  GetCategories,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { CategoryModel } from '@/domain/models';
import { CategoriesRequest } from '@/@types/request';
import { CategoryDataSource } from '@/data/data-sources';

export class RemoteGetCategories implements GetCategories {
  private readonly httpClient: HttpClient;

  private pageLimit: number;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/categories`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.pageLimit = 0;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'populate[image][fields]': 'url',
    };

    return formatedParams;
  }

  public async all(
    params: GetCategoriesAllCategoryParams
  ): Promise<CategoryModel[]> {
    try {
      if (this.pageLimit && (params.pagination?.page || 1) > this.pageLimit)
        throw new Error('Page limit exceeded');

      const response = await this.httpClient.request<CategoriesRequest>({
        method: 'GET',
        url: this.baseUrl,
        params: this.formatParams(params),
      });
      if (
        response.statusCode === HttpStatusCode.ok &&
        response?.body?.data?.length
      ) {
        if (!this.pageLimit)
          this.pageLimit = response.body.meta.pagination.pageCount;

        return new CategoryDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
