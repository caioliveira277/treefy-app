import { RemoteGetArticles } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetArticles = () =>
  new RemoteGetArticles(new AxiosHttpClient());
