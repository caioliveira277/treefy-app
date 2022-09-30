import { SpecieModel } from '@/domain/models';

export type GetSpeciesByNameParams = {
  name: string;
  accessToken: string;
};

export interface GetSpecies {
  byName(params: GetSpeciesByNameParams): Promise<SpecieModel[]>;
}
