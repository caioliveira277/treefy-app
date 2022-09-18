import { AccountModel } from '@/domain/models';
import { Authentication } from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ProfileViewModel extends BaseViewModel {
  authentication: Authentication;

  viewedArticles: number;
  countFeedback: number;
  authenticatedUser: AccountModel;

  handleNavigation(routeName: keyof MainSubRoutes): void;
  handleGetAuthenticatedUser(): Promise<void>;
  handleLoggout(): Promise<void>;
}
