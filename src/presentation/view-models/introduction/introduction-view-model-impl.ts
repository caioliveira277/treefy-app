import { IntroductionViewModel } from './introduction-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class IntroductionViewModelImpl
  extends BaseViewModelImpl
  implements IntroductionViewModel
{
  handleMoveToAccess(): void {
    this.baseView?.props.navigation.navigate('Access');
  }
}
