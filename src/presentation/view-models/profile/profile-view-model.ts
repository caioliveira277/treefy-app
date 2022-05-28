import { BaseViewModel } from '../base-view-model';

export interface ProfileViewModel extends BaseViewModel {
  completeName: string;
  viewedArticles: number;
  countFeedback: number;

  handleNavigation(routeName: keyof MainRoutesParamsList): void;
  handleLoggout(): void;
}
