import { RangeTimes } from '@/@types/enums';
import { MyGardenItem } from '@/presentation/@types/generics';
import {
  add,
  compareAsc,
  format,
  formatDistanceToNowStrict,
  isBefore,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDateTime = (dateTime: Date) =>
  format(dateTime, 'dd/MM/yy - HH:mm');

export const formatDate = (dateTime: Date) => format(dateTime, 'dd/MM/yy');

export const formatDateTimeToComplete = (
  lastFinished: Date | null,
  times: number | null,
  range: RangeTimes | null
): { distance: string; dateTime: Date } => {
  if (!times || !range || !lastFinished)
    return { distance: '', dateTime: new Date() };

  const dateTimeToComplete = add(lastFinished, {
    [range]: times,
  });

  const dateToComplete = isBefore(dateTimeToComplete, new Date())
    ? ''
    : formatDistanceToNowStrict(dateTimeToComplete, {
        locale: ptBR,
      });

  return {
    distance: dateToComplete,
    dateTime: dateTimeToComplete,
  };
};

export const shortDistanceToComplete = (
  plants: [MyGardenItem, MyGardenItem]
) => {
  const plant1 = plants[0];
  const plant2 = plants[1];
  let paramsType1: {
    date: keyof MyGardenItem;
    range: keyof MyGardenItem;
    times: keyof MyGardenItem;
  } = {
    date: 'lastWatering',
    range: 'waterRange',
    times: 'waterTimes',
  };
  let paramsType2 = paramsType1;

  if (plant1.type === 'sun') {
    paramsType1 = {
      date: 'lastSunExposure',
      range: 'sunRange',
      times: 'sunTimes',
    };
  }

  if (plant2.type === 'sun') {
    paramsType2 = {
      date: 'lastSunExposure',
      range: 'sunRange',
      times: 'sunTimes',
    };
  }

  if (plant1[paramsType1.date] && plant2[paramsType1.date]) {
    const dateTimeToComplete1 = add(plant1[paramsType1.date] as Date, {
      [plant1[paramsType1.range] as string]: plant1[paramsType1.times],
    });

    const dateTimeToComplete2 = add(plant2[paramsType2.date] as Date, {
      [plant2[paramsType2.range] as string]: plant2[paramsType2.times],
    });

    return compareAsc(dateTimeToComplete1, dateTimeToComplete2);
  }

  if (plant1[paramsType1.date]) return -1;

  return 0;
};
