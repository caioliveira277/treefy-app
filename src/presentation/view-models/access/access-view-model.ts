import { BaseViewModel } from '../base-view-model';

export interface AccessViewModel extends BaseViewModel {
  handleAccessAccount(): void;
  handleSignup(): void;
}
