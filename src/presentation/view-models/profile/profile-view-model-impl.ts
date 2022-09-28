import { ProfileViewModel } from './profile-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import {
  Authentication,
  GetFeedbacks,
  GetViewedArticles,
} from '@/domain/usecases';

export class ProfileViewModelImpl
  extends BaseViewModelImpl
  implements ProfileViewModel
{
  public readonly authentication: Authentication;

  public readonly getViewedArticles: GetViewedArticles;

  public readonly getFeedbacks: GetFeedbacks;

  public viewedArticles: number;

  public countFeedback: number;

  public statusLoading: boolean;

  constructor(
    authentication: Authentication,
    getViewedArticles: GetViewedArticles,
    getFeedbacks: GetFeedbacks
  ) {
    super();

    this.authentication = authentication;
    this.getViewedArticles = getViewedArticles;
    this.getFeedbacks = getFeedbacks;

    this.viewedArticles = 0;
    this.countFeedback = 0;
    this.statusLoading = true;
  }

  private handleChangeStatusLoadingState(state: boolean): void {
    this.statusLoading = state;
    this.notifyViewAboutChanges();
  }

  public async handleGetProfileStatus(): Promise<void> {
    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;
    const accessToken = user?.accessToken || '';

    this.viewedArticles = await this.getViewedArticles.quantityByUser({
      accessToken,
    });

    this.countFeedback = await this.getFeedbacks.quantityGivenInArticles({
      accessToken,
    });

    this.handleChangeStatusLoadingState(false);
  }

  public handleNavigation(routeName: any): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'ProfileGroup',
      params: {
        screen: routeName,
      },
    });
  }

  public async handleLoggout(): Promise<void> {
    this.baseView?.props.contextConsumer?.authentication?.loggoutUser();
    await this.authentication.loggout();
  }
}
