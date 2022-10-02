import {
  CreateUserPlantsCreateParams,
  CreateUserPlants,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { UserPlantModel } from '@/domain/models';
import { UserPlantRequest } from '@/@types/request';
import { UserPlantDataSource } from '@/data/data-sources';
import { RangeTimes } from '@/@types/enums';

export class RemoteCreateUserPlants implements CreateUserPlants {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/userPlants`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatBody(params: Record<string, any>) {
    const formatedBody: { data: { [key: string]: string | number } } = {
      data: {
        name: params?.name,
        annotation: params?.annotation,
        waterTimes: params?.waterTimes,
        waterRange: Object.keys(RangeTimes).indexOf(params?.waterRange),
        sunTimes: params?.sunTimes,
        sunRange: Object.keys(RangeTimes).indexOf(params?.sunRange),
      },
    };

    return formatedBody;
  }

  public async create(
    params: CreateUserPlantsCreateParams
  ): Promise<UserPlantModel> {
    try {
      const response = await this.httpClient.request<UserPlantRequest>({
        method: 'POST',
        url: this.baseUrl,
        body: this.formatBody(params),
        headers: {
          authorization: params.accessToken,
        },
      });

      if (response.statusCode === HttpStatusCode.ok && response.body?.data) {
        return new UserPlantDataSource([response.body.data]).toModel()[0];
      }
    } catch (error) {
      return {} as UserPlantModel;
    }
    return {} as UserPlantModel;
  }
}
