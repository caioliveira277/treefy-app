import { RemoteGetSpecies } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/axios';

export const makeRemoteGetSpecies = () =>
  new RemoteGetSpecies(new AxiosHttpClient());
