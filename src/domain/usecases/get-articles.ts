import { RequestPagination } from '@/@types/request';
import { ArticleModel } from '@/domain/models';

export type GetByCategoryIdParams = {
  categoryId: number;
} & RequestPagination;

export interface GetArticles {
  allByCategoryId(params?: GetByCategoryIdParams): Promise<ArticleModel[]>;
}
