import { ArticleModel, CategoryModel } from '@/domain/models';
import { GetArticles, GetCategories } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface HomeViewModel extends BaseViewModel {
  getCategories: GetCategories;
  getArticles: GetArticles;

  categories: CategoryModel[];
  articles: ArticleModel[];

  isArticleSearch: boolean;

  handleGetCategories(): Promise<void>;
  handleGetArticles(selectedCategoryId: number): Promise<void>;
  handleSearchArticles(search: string): Promise<void>;
  handleNavigateToArticle(): void;
}
