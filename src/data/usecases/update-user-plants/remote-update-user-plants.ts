import {
  UpdateUserPlantsCreateParams,
  UpdateUserPlants,
  UpdateUserPlantsFinishParams,
} from '@/domain/usecases';
import { HttpClient, HttpStatusCode } from '@/data/protocols';
import { UserPlantModel } from '@/domain/models';
import { UserPlantRequest } from '@/@types/request';
import { UserPlantDataSource } from '@/data/data-sources';
import { endOfDay, formatISO } from 'date-fns';

export class RemoteUpdateUserPlants implements UpdateUserPlants {
  private readonly httpClient: HttpClient;

  private readonly baseUrl = `${process.env.API_BASE_URL}/api/user-plants`;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private formatBody(params: Record<string, any>) {
    const formatedBody: { data: { [key: string]: string | number } } = {
      data: {
        name: params?.name,
        annotation: params?.annotation,
        waterTimes: params?.waterTimes,
        waterRange: params?.waterRange || null,
        sunTimes: params?.sunTimes,
        sunRange: params?.sunRange || null,
        species: params?.specie?.id || null,
      },
    };

    return formatedBody;
  }

  private formatFinishBody(params: Record<string, any>) {
    const formatedBody: { data: { [key: string]: string | number } } = {
      data: {
        [params.type === 'sun' ? 'lastSunExposure' : 'lastWatering']: formatISO(
          endOfDay(new Date())
        ),
      },
    };

    return formatedBody;
  }

  public async update(
    params: UpdateUserPlantsCreateParams
  ): Promise<UserPlantModel> {
    try {
      const response = await this.httpClient.request<UserPlantRequest>({
        method: 'PUT',
        url: `${this.baseUrl}/${params.id}`,
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

  public async finish(
    params: UpdateUserPlantsFinishParams
  ): Promise<UserPlantModel> {
    try {
      const response = await this.httpClient.request<UserPlantRequest>({
        method: 'PUT',
        url: `${this.baseUrl}/${params.id}`,
        body: this.formatFinishBody(params),
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
