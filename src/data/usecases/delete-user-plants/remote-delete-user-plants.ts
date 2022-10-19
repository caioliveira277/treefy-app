import {
  DeleteUserPlants,
  DeleteUserPlantsDeleteParams,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';

export class RemoteDeleteUserPlants implements DeleteUserPlants {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/user-plants`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async delete(params: DeleteUserPlantsDeleteParams): Promise<boolean> {
    try {
      const response = await this.httpClient.request({
        method: 'DELETE',
        url: `${this.baseUrl}/${params.id}`,
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
