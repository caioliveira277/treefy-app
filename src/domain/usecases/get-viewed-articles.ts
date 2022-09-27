import { PaginationRequest } from '@/@types/request';

export type GetViewedArticlesQuantityByUserParams = {
  accessToken: string;
} & PaginationRequest;

export interface GetViewedArticles {
  quantityByUser(
    params?: GetViewedArticlesQuantityByUserParams
  ): Promise<number>;
}
