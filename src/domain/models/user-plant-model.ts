import { RangeTimes } from '@/@types/enums';

export type UserPlantModel = {
  id: number;
  specieId: number;
  name: string;
  annotation: string;
  waterTimes: number;
  waterRange: RangeTimes;
  sunTimes: number;
  sunRange: RangeTimes;
};
