import { RangeTimes } from '@/@types/enums';

export type SpecieModel = {
  id: number;
  name: string;
  description: string;
  image: string;
  waterTimes: number;
  waterRange: RangeTimes;
  sunTimes: number;
  sunRange: RangeTimes;
};
