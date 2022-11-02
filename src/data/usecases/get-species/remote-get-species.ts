import { SpeciesRequest } from '@/@types/request';
import { SpecieDataSource } from '@/data/data-sources';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { SpecieModel } from '@/domain/models';
import { GetSpecies, GetSpeciesByNameParams } from '@/domain/usecases';

export class RemoteGetSpecies implements GetSpecies {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/species`;

  private pageLimit: number;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.pageLimit = 0;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'filters[name][$containsi]': params?.name || '',
      'populate[image][fields][0]': 'url',
    };

    return formatedParams;
  }

  public async byName(params: GetSpeciesByNameParams): Promise<SpecieModel[]> {
    try {
      if (this.pageLimit && (params.pagination?.page || 1) > this.pageLimit)
        throw new Error('Page limit exceeded');

      const response = await this.httpClient.request<SpeciesRequest>({
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

        return new SpecieDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
