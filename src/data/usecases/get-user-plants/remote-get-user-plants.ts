import { UserPlantsRequest } from '@/@types/request';
import { UserPlantDataSource } from '@/data/data-sources';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { UserPlantModel } from '@/domain/models';
import { GetUserPlants, GetUserPlantsAllParams } from '@/domain/usecases';

export class RemoteGetUserPlants implements GetUserPlants {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/user-plants`;

  private pageLimit: number;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.pageLimit = 0;
  }

  private formatParams(params: Record<string, any>) {
    const formatedParams: { [key: string]: string | number } = {
      'pagination[page]': params?.pagination?.page || 1,
      'pagination[pageSize]': params?.pagination?.size || 10,
      'populate[species][fields][0]': '*',
      'populate[species][populate][image][fields][0]': 'url',
    };

    return formatedParams;
  }

  public async all(params: GetUserPlantsAllParams): Promise<UserPlantModel[]> {
    try {
      if (this.pageLimit && (params.pagination?.page || 1) > this.pageLimit)
        throw new Error('Page limit exceeded');

      const response = await this.httpClient.request<UserPlantsRequest>({
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
        if (!this.pageLimit)
          this.pageLimit = response.body.meta.pagination.pageCount;

        return new UserPlantDataSource(response.body.data).toModel();
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
