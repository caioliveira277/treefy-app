import { HomeViewModel } from './home-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication, GetArticles, GetCategories } from '@/domain/usecases';
import { ArticleModel, CategoryModel } from '@/domain/models';

export class HomeViewModelImpl
  extends BaseViewModelImpl
  implements HomeViewModel
{
  public readonly getCategories: GetCategories;

  public readonly getArticles: GetArticles;

  public readonly authentication: Authentication;

  public categories: CategoryModel[];

  public articles: ArticleModel[];

  public isArticleSearch: boolean;

  public loadingArticles: boolean;

  public loadingCategories: boolean;

  public selectedCategoryId: number | null;

  constructor(
    getCategories: GetCategories,
    getArticles: GetArticles,
    authentication: Authentication
  ) {
    super();
    this.getCategories = getCategories;
    this.getArticles = getArticles;
    this.authentication = authentication;
    this.categories = [];
    this.selectedCategoryId = null;
    this.articles = [];
    this.isArticleSearch = false;
    this.loadingArticles = true;
    this.loadingCategories = true;
  }

  private handleSetArticlesLoading(state: boolean): void {
    this.loadingArticles = state;
    this.notifyViewAboutChanges();
  }

  private handleSetCategoriesLoading(state: boolean): void {
    this.loadingCategories = state;
    this.notifyViewAboutChanges();
  }

  public async handleGetCategories(page?: number): Promise<void> {
    if (!page) {
      this.handleSetCategoriesLoading(true);
    }

    const categories = await this.getCategories.all({
      pagination: {
        page,
      },
    });
    this.categories.push(...categories);

    if (!this.selectedCategoryId) {
      this.handleSelectCategory(categories[0]?.id);
    }
    this.handleSetCategoriesLoading(false);
  }

  public handleSelectCategory(selectedCategoryId: number): void {
    this.selectedCategoryId = selectedCategoryId;
  }

  public async handleGetArticles(): Promise<void> {
    this.handleSetArticlesLoading(true);

    if (this.selectedCategoryId) {
      const articles = await this.getArticles.allByCategoryId({
        categoryId: this.selectedCategoryId,
      });
      this.articles = articles;
    } else {
      this.articles = [];
    }

    this.handleSetArticlesLoading(false);
  }

  public async handleSearchArticles(search: string): Promise<void> {
    if (!search) {
      this.isArticleSearch = false;
      await this.handleGetArticles();
      return;
    }
    this.handleSetArticlesLoading(true);
    const articles = await this.getArticles.allBySearch({
      search,
    });

    this.articles = articles;
    this.isArticleSearch = true;
    this.handleSetArticlesLoading(false);
  }

  public handleNavigateToArticle(articleId: number): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'HomeGroup',
      params: {
        screen: 'Article',
        params: {
          articleId,
        },
      },
    });
  }
}
