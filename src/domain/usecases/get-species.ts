import { PaginationRequest } from '@/@types/request';
import { SpecieModel } from '@/domain/models';

export type GetSpeciesByNameParams = {
  name: string;
} & PaginationRequest;

export interface GetSpecies {
  byName(params: GetSpeciesByNameParams): Promise<SpecieModel[]>;
}
