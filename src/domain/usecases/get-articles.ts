import { PaginationRequest } from '@/@types/request';
import { ArticleModel } from '@/domain/models';

export type GetAllByCategoryIdParams = {
  categoryId: number;
} & PaginationRequest;

export type GetAllBySearchParams = {
  search: string;
} & PaginationRequest;

export interface GetArticles {
  allByCategoryId(params?: GetAllByCategoryIdParams): Promise<ArticleModel[]>;
  allBySearch(params?: GetAllBySearchParams): Promise<ArticleModel[]>;
}
