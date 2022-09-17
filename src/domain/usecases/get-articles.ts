import { PaginationRequest } from '@/@types/request';
import { ArticleModel } from '@/domain/models';

export type GetByCategoryIdParams = {
  categoryId: number;
} & PaginationRequest;

export interface GetArticles {
  allByCategoryId(params?: GetByCategoryIdParams): Promise<ArticleModel[]>;
}
