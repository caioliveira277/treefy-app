import { RemoteCreateViewedArticles } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteCreateViewedArticles = () =>
  new RemoteCreateViewedArticles(new AxiosHttpClient());
