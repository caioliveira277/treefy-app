import { RemoteGetFeedbacks } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetFeedbacks = () =>
  new RemoteGetFeedbacks(new AxiosHttpClient());
