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

  public loadingArticles: boolean;

  public loadingCategories: boolean;

  public selectedCategoryId: number | null;

  public hideCategories: boolean;

  public search: string;

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
    this.loadingArticles = true;
    this.loadingCategories = true;
    this.hideCategories = false;
    this.search = '';
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
    this.categories = [...this.categories, ...categories];

    if (!this.selectedCategoryId) {
      this.handleSelectCategory(categories[0]?.id);
    }
    this.handleSetCategoriesLoading(false);
  }

  public handleSelectCategory(selectedCategoryId: number): void {
    this.selectedCategoryId = selectedCategoryId;
  }

  public async handleGetArticles(page?: number): Promise<void> {
    if (!page) {
      this.articles = [];
      this.handleSetArticlesLoading(true);
    }

    if (this.selectedCategoryId) {
      const articles = await this.getArticles.allByCategoryId({
        categoryId: this.selectedCategoryId,
        pagination: {
          page,
        },
      });

      this.articles = [...this.articles, ...articles];
    } else {
      this.articles = [];
    }

    this.handleSetArticlesLoading(false);
  }

  public async handleSearchArticles(
    search: string,
    page?: number
  ): Promise<void> {
    this.search = search;
    this.notifyViewAboutChanges();

    if (!search) {
      await this.handleGetArticles();
      return;
    }

    if (!page) {
      this.handleSetArticlesLoading(true);
      this.articles = [];
    }

    const articles = await this.getArticles.allBySearch({
      search,
      pagination: {
        page,
      },
    });

    this.articles = [...this.articles, ...articles];
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

  public handleChangeHideCategoriesState(state: boolean): void {
    this.hideCategories = state;
    this.notifyViewAboutChanges();
  }
}
