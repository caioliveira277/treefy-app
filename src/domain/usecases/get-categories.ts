import { CategoryModel } from '@/domain/models';

export type CategoryParams = {
  pagination?: {
    page?: number;
    size?: number;
  };
};

export interface GetCategories {
  getAll(params: CategoryParams): Promise<CategoryModel[]>;
}
