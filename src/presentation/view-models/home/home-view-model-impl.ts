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
  }

  public async handleGetCategories(): Promise<void> {
    const categories = await this.getCategories.all();
    this.categories = categories;
    this.notifyViewAboutChanges();
  }

  public async handleGetArticles(selectedCategoryId: number): Promise<void> {
    const articles = await this.getArticles.allByCategoryId({
      categoryId: selectedCategoryId,
    });
    this.articles = articles;
    this.notifyViewAboutChanges();
  }

  public async handleSearchArticles(search: string): Promise<void> {
    if (!search) {
      this.isArticleSearch = false;
      this.notifyViewAboutChanges();
      return;
    }

    const articles = await this.getArticles.allBySearch({
      search,
    });
    this.articles = articles;
    this.isArticleSearch = true;
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
