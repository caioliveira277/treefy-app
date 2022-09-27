import {
  Authentication,
  GetFeedbacks,
  GetViewedArticles,
} from '@/domain/usecases';
import { BaseViewModel } from '../base-view-model';

export interface ProfileViewModel extends BaseViewModel {
  authentication: Authentication;
  getViewedArticles: GetViewedArticles;
  getFeedbacks: GetFeedbacks;

  viewedArticles: number;
  countFeedback: number;

  handleNavigation(routeName: any): void;
  handleLoggout(): Promise<void>;
  handleGetProfileStatus(): Promise<void>;
}
