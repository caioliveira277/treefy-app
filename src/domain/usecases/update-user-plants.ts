import { RangeTimes } from '@/@types/enums';
import { SpecieModel, UserPlantModel } from '@/domain/models';

export type UpdateUserPlantsCreateParams = {
  id: number;
  name: string;
  specie: SpecieModel | null;
  annotation: string;
  waterTimes: number | null;
  waterRange: RangeTimes | null;
  sunTimes: number | null;
  sunRange: RangeTimes | null;
  accessToken: string;
};

export type UpdateUserPlantsFinishParams = {
  id: number;
  accessToken: string;
  type: 'sun' | 'water';
};

export interface UpdateUserPlants {
  update(params: UpdateUserPlantsCreateParams): Promise<UserPlantModel>;
  finish(params: UpdateUserPlantsFinishParams): Promise<UserPlantModel>;
}
