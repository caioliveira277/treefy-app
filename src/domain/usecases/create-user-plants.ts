import { RangeTimes } from '@/@types/enums';
import { UserPlantModel } from '@/domain/models';

export type CreateUserPlantsCreateParams = {
  name: string;
  annotation: string;
  waterTimes: number;
  waterRange: RangeTimes;
  sunTimes: number;
  sunRange: RangeTimes;
  accessToken: string;
};

export interface CreateUserPlants {
  create(params: CreateUserPlantsCreateParams): Promise<UserPlantModel>;
}
