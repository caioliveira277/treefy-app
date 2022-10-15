import { RangeTimes } from '@/@types/enums';
import { SpecieModel } from './specie-model';

export type UserPlantModel = {
  id: number | null;
  specie: SpecieModel | null;
  name: string;
  annotation: string;
  waterTimes: number | null;
  waterRange: RangeTimes | null;
  sunTimes: number | null;
  sunRange: RangeTimes | null;
};
