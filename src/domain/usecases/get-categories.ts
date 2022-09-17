import { PaginationRequest } from '@/@types/request';
import { CategoryModel } from '@/domain/models';

export type AllCategoryParams = {} & PaginationRequest;

export interface GetCategories {
  all(params?: AllCategoryParams): Promise<CategoryModel[]>;
}
