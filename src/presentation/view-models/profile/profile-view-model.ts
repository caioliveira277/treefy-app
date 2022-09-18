import { Authentication } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ProfileViewModel extends BaseViewModel {
  authentication: Authentication;

  viewedArticles: number;
  countFeedback: number;

  handleNavigation(routeName: keyof MainSubRoutes): void;
  handleLoggout(): Promise<void>;
}
