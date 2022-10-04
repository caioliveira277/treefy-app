import { RangeTimes } from '@/@types/enums';

export type UserPlantModel = {
  id: number | null;
  specieId: number | null;
  name: string;
  annotation: string;
  waterTimes: number | null;
  waterRange: RangeTimes | null;
  sunTimes: number | null;
  sunRange: RangeTimes | null;
};
