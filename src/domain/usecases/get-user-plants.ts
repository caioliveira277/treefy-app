import { UserPlantModel } from '../models';

export type GetUserPlantsAllParams = {
  accessToken: string;
};

export interface GetUserPlants {
  all(params: GetUserPlantsAllParams): Promise<UserPlantModel[]>;
}
