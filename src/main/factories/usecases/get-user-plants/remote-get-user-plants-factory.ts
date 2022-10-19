import { RemoteGetUserPlants } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetUserPlants = () =>
  new RemoteGetUserPlants(new AxiosHttpClient());
