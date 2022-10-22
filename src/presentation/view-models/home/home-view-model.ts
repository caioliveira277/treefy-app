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
  isArticleSearch: boolean;
  loadingArticles: boolean;
  loadingCategories: boolean;

  handleSelectCategory(selectedCategoryId: number): void;
  handleGetCategories(page?: number): Promise<void>;
  handleGetArticles(): Promise<void>;
  handleSearchArticles(search: string): Promise<void>;
  handleNavigateToArticle(articleId: number): void;
}
