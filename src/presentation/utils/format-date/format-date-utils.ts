import { format } from 'date-fns';

export const formatDateTime = (dateTime: Date) =>
  format(dateTime, 'dd/MM/yy - HH:MM');

export const formatDate = (dateTime: Date) => format(dateTime, 'dd/MM/yy');
