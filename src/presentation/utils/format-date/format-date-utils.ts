import { RangeTimes } from '@/@types/enums';
import { add, format, formatDistanceToNowStrict, isBefore } from 'date-fns';
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
