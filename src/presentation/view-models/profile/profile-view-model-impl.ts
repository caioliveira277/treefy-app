import { ProfileViewModel } from './profile-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';

export class ProfileViewModelImpl
  extends BaseViewModelImpl
  implements ProfileViewModel
{
  public authentication: Authentication;

  public completeName: string;

  public viewedArticles: number;

  public countFeedback: number;

  constructor(authentication: Authentication) {
    super();
    this.authentication = authentication;
    this.completeName = '';
    this.viewedArticles = 0;
    this.countFeedback = 0;
  }

  public handleNavigation(routeName: keyof MainSubRoutes): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'ProfileGroup',
      params: {
        screen: routeName,
      },
    });
  }

  public async handleLoggout(): Promise<void> {
    await this.authentication.loggout();
    this.baseView?.props.navigation.navigate('Public', { screen: 'Access' });
  }
}
