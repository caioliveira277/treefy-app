import { Pagination } from '@/@types/request';
import { ArticleModel } from '@/domain/models';

export type GetByCategoryIdParams = {
  categoryId: number;
} & Pagination;

export interface GetCategories {
  getByCategoryId(params?: GetByCategoryIdParams): Promise<ArticleModel[]>;
}
