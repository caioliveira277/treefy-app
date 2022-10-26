import { ArticleModel, CategoryModel } from '@/domain/models';
import { Authentication, GetArticles, GetCategories } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface HomeViewModel extends BaseViewModel {
  getCategories: GetCategories;
  getArticles: GetArticles;
  authentication: Authentication;

  categories: CategoryModel[];
  selectedCategoryId: number | null;
  articles: ArticleModel[];
  loadingArticles: boolean;
  loadingCategories: boolean;
  hideCategories: boolean;
  search: string;

  handleSelectCategory(selectedCategoryId: number): void;
  handleGetCategories(page?: number): Promise<void>;
  handleGetArticles(page?: number): Promise<void>;
  handleSearchArticles(search: string, page?: number): Promise<void>;
  handleChangeHideCategoriesState(state: boolean): void;
  handleNavigateToArticle(articleId: number): void;
}
