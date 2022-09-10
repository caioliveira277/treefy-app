import { HomeViewModel } from './home-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { GetCategories } from '@/domain/usecases';
import { CategoryModel } from '@/domain/models';

export class HomeViewModelImpl
  extends BaseViewModelImpl
  implements HomeViewModel
{
  public readonly getCategories: GetCategories;

  public categories: CategoryModel[];

  constructor(getCategories: GetCategories) {
    super();
    this.getCategories = getCategories;
    this.categories = [];
  }

  public async handleGetCategories(): Promise<void> {
    const categories = await this.getCategories.all();
    this.categories = categories;
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
