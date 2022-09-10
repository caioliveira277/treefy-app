import { RemoteGetCategories } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetCategories = () =>
  new RemoteGetCategories(new AxiosHttpClient());
