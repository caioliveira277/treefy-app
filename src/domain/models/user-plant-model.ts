import { RangeTimes } from '@/@types/request';

export type UserPlantModel = {
  id: number;
  specieId: string;
  name: string;
  annotation: string;
  waterTimes: number;
  waterRange: RangeTimes;
  sunTimes: number;
  sunRange: RangeTimes;
};
