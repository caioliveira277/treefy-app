import { BaseViewModel } from '../base-view-model';

export interface IntroductionViewModel extends BaseViewModel {
  activeSlideIndex: number;

  handlePageSelected(index: number): void;
  handleMoveToAccess(): void;
}
