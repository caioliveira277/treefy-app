import { RangeTimes } from '@/@types/enums';
import { SpecieModel, UserPlantModel } from '@/domain/models';

export type CreateUserPlantsCreateParams = {
  name: string;
  annotation: string;
  specie: SpecieModel | null;
  waterTimes: number | null;
  waterRange: RangeTimes | null;
  sunTimes: number | null;
  sunRange: RangeTimes | null;
  accessToken: string;
};

export interface CreateUserPlants {
  create(params: CreateUserPlantsCreateParams): Promise<UserPlantModel>;
}
