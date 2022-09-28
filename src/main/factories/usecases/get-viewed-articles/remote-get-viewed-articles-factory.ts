import { RemoteGetViewedArticles } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetViewedArticles = () =>
  new RemoteGetViewedArticles(new AxiosHttpClient());
