import { CategoryModel } from '@/domain/models';

export type CategoryParams = {
  pagination?: {
    page?: number;
    size?: number;
  };
};

export interface GetCategories {
  all(params?: CategoryParams): Promise<CategoryModel[]>;
}
