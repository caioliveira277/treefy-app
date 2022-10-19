import { RemoteDeleteUserPlants } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteDeleteUserPlants = () =>
  new RemoteDeleteUserPlants(new AxiosHttpClient());
