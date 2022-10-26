import { PaginationRequest } from '@/@types/request';
import { UserPlantModel } from '../models';

export type GetUserPlantsAllParams = {
  accessToken: string;
} & PaginationRequest;

export interface GetUserPlants {
  all(params: GetUserPlantsAllParams): Promise<UserPlantModel[]>;
}
