import { BaseViewModelImpl } from '../base-view-model-impl';
import { HelpViewModel } from './help-view-model';

export class HelpViewModelImpl
  extends BaseViewModelImpl
  implements HelpViewModel
{
  handleMoveBack(): void {
    this.baseView?.props.navigation.goBack();
  }
}
