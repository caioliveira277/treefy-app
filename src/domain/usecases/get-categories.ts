import { PaginationRequest } from '@/@types/request';
import { CategoryModel } from '@/domain/models';

export type GetCategoriesAllCategoryParams = {} & PaginationRequest;

export interface GetCategories {
  all(params?: GetCategoriesAllCategoryParams): Promise<CategoryModel[]>;
}
