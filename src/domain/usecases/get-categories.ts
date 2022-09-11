import { RequestPagination } from '@/@types/request';
import { CategoryModel } from '@/domain/models';

export type AllCategoryParams = {} & RequestPagination;

export interface GetCategories {
  all(params?: AllCategoryParams): Promise<CategoryModel[]>;
}
