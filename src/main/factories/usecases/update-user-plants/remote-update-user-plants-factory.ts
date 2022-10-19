import { RemoteUpdateUserPlants } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteUpdateUserPlants = () =>
  new RemoteUpdateUserPlants(new AxiosHttpClient());
