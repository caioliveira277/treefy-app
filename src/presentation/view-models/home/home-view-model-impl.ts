import { HomeViewModel } from './home-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class HomeViewModelImpl
  extends BaseViewModelImpl
  implements HomeViewModel
{
  public handleNavigateToArticle(): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'HomeGroup',
      params: {
        screen: 'Article',
      },
    });
  }
}
