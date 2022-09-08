import { CategoryParams, GetCategories } from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { CategoryModel } from '@/domain/models';

export class RemoteGetCategories implements GetCategories {
  private readonly httpClient: HttpClient;

  private readonly url = `${process.env.API_BASE_URL}/categories`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async getAll(params: CategoryParams): Promise<CategoryModel[]> {
    const response = await this.httpClient.request<CategoryModel[]>({
      method: 'GET',
      url: this.url,
      params: {
        'pagination[page]': params.pagination?.page,
        'pagination[pageSize]': params.pagination?.size,
      },
    });
    if (response.statusCode === HttpStatusCode.ok) {
      return response.body || [];
    }
    return [];
  }
}
