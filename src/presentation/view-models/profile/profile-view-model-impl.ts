import { ProfileViewModel } from './profile-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Authentication } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

export class ProfileViewModelImpl
  extends BaseViewModelImpl
  implements ProfileViewModel
{
  public authentication: Authentication;

  public viewedArticles: number;

  public countFeedback: number;

  public authenticatedUser: AccountModel;

  constructor(authentication: Authentication) {
    super();
    this.authentication = authentication;
    this.viewedArticles = 0;
    this.countFeedback = 0;
    this.authenticatedUser = { name: '' } as AccountModel;
  }

  public handleNavigation(routeName: keyof MainSubRoutes): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'ProfileGroup',
      params: {
        screen: routeName,
      },
    });
  }

  public async handleGetAuthenticatedUser(): Promise<void> {
    this.authenticatedUser = await this.authentication.getAuthenticatedUser();
    this.notifyViewAboutChanges();
  }

  public async handleLoggout(): Promise<void> {
    await this.authentication.loggout();
    this.baseView?.props.contextConsumer?.authentication?.setIsAuthenticated(
      false
    );
  }
}
