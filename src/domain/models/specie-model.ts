import { RangeTimes } from '@/@types/request';

export type SpecieModel = {
  id: number;
  name: string;
  description: string;
  waterTimes: number;
  waterRange: RangeTimes;
  sunTimes: number;
  sunRange: RangeTimes;
};
