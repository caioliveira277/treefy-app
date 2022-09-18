import { AccountModel, ArticleModel, CategoryModel } from '@/domain/models';
import { Authentication, GetArticles, GetCategories } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface HomeViewModel extends BaseViewModel {
  getCategories: GetCategories;
  getArticles: GetArticles;
  authentication: Authentication;

  authenticatedUser: AccountModel;
  categories: CategoryModel[];
  articles: ArticleModel[];
  isArticleSearch: boolean;

  handleGetCategories(): Promise<void>;
  handleGetArticles(selectedCategoryId: number): Promise<void>;
  handleSearchArticles(search: string): Promise<void>;
  handleGetAuthenticatedUser(): Promise<void>;
  handleNavigateToArticle(): void;
}
