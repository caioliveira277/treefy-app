import { RemoteCreateFeedbacks } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteCreateFeedbacks = () =>
  new RemoteCreateFeedbacks(new AxiosHttpClient());
