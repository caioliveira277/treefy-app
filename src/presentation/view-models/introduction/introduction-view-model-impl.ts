import { IntroductionViewModel } from './introduction-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class IntroductionViewModelImpl
  extends BaseViewModelImpl
  implements IntroductionViewModel
{
  public activeSlideIndex: number;

  constructor() {
    super();
    this.activeSlideIndex = 0;
  }

  public handlePageSelected(index: number): void {
    this.activeSlideIndex = index;
    this.notifyViewAboutChanges();
  }

  public handleMoveToAccess(): void {
    this.baseView?.props.navigation.navigate('Public', { screen: 'Access' });
  }
}
