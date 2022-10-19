import { RemoteCreateUserPlants } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteCreateUserPlants = () =>
  new RemoteCreateUserPlants(new AxiosHttpClient());
