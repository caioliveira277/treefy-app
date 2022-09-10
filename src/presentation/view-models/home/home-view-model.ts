import { CategoryModel } from '@/domain/models';
import { GetCategories } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface HomeViewModel extends BaseViewModel {
  getCategories: GetCategories;

  categories: CategoryModel[];

  handleGetCategories(): Promise<void>;

  handleNavigateToArticle(): void;
}
