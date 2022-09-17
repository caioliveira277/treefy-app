import { HomeViewModel } from './home-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { GetArticles, GetCategories } from '@/domain/usecases';
import { ArticleModel, CategoryModel } from '@/domain/models';

export class HomeViewModelImpl
  extends BaseViewModelImpl
  implements HomeViewModel
{
  public readonly getCategories: GetCategories;

  public readonly getArticles: GetArticles;

  public categories: CategoryModel[];

  public articles: ArticleModel[];

  constructor(getCategories: GetCategories, getArticles: GetArticles) {
    super();
    this.getCategories = getCategories;
    this.getArticles = getArticles;
    this.categories = [];
    this.articles = [];
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

  public handleNavigateToArticle(): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'HomeGroup',
      params: {
        screen: 'Article',
      },
    });
  }
}
