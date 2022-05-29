import { TermsUseViewModel } from './terms-use-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class TermsUseViewModelImpl
  extends BaseViewModelImpl
  implements TermsUseViewModel
{
  handleMoveBack(): void {
    this.baseView?.props.navigation.goBack();
  }
}
