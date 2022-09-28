import { PaginationRequest } from '@/@types/request';
import { ArticleModel } from '@/domain/models';

export type GetArticlesAllByCategoryIdParams = {
  categoryId: number;
} & PaginationRequest;

export type GetArticlesAllBySearchParams = {
  search: string;
} & PaginationRequest;

export type GetArticlesOneByIdParams = {
  articleId: number;
};

export interface GetArticles {
  allByCategoryId(
    params: GetArticlesAllByCategoryIdParams
  ): Promise<ArticleModel[]>;
  allBySearch(params: GetArticlesAllBySearchParams): Promise<ArticleModel[]>;
  oneById(params: GetArticlesOneByIdParams): Promise<ArticleModel>;
}
