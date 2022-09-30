import { SpecieModel } from '@/domain/models';

export type GetSpeciesByNameParams = {
  name: string;
};

export interface GetSpecies {
  byName(params: GetSpeciesByNameParams): Promise<SpecieModel[]>;
}
