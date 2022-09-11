import { Pagination } from '@/@types/request';
import { CategoryModel } from '@/domain/models';

export type AllCategoryParams = {} & Pagination;

export interface GetCategories {
  all(params?: AllCategoryParams): Promise<CategoryModel[]>;
}
