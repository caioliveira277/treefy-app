import { BaseViewModel } from '../base-view-model';

export interface ProfileViewModel extends BaseViewModel {
  completeName: string;
  viewedArticles: number;
  countFeedback: number;

  handleLoggout(): void;
}
