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

  public async handleGetCategories(): Promise<void> {
    this.handleSetCategoriesLoading(true);

    const categories = await this.getCategories.all();

    this.categories = categories;
    this.handleSetCategoriesLoading(false);
    this.notifyViewAboutChanges();
  }

  public async handleGetArticles(selectedCategoryId: number): Promise<void> {
    this.handleSetArticlesLoading(true);

    const articles = await this.getArticles.allByCategoryId({
      categoryId: selectedCategoryId,
    });

    this.articles = articles;
    this.handleSetArticlesLoading(false);
    this.notifyViewAboutChanges();
  }

  public async handleSearchArticles(search: string): Promise<void> {
    if (!search) {
      this.isArticleSearch = false;
      this.notifyViewAboutChanges();
      return;
    }

    this.handleSetArticlesLoading(true);

    const articles = await this.getArticles.allBySearch({
      search,
    });
    this.articles = articles;
    this.isArticleSearch = true;
    this.handleSetArticlesLoading(false);
    this.notifyViewAboutChanges();
  }

  public handleNavigateToArticle(): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'HomeGroup',
      params: {
        screen: 'Article',
      },
    });
  }
}
