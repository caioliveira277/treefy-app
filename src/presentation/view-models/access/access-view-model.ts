import { BaseViewModel } from '../base-view-model';

export interface AccessViewModel extends BaseViewModel {
  handleMoveToAuthentication(): void;
  handleMoveToSignup(): void;
}
