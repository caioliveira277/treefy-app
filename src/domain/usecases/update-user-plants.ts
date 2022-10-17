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

export interface UpdateUserPlants {
  update(params: UpdateUserPlantsCreateParams): Promise<UserPlantModel>;
}
