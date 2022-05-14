import { BaseViewModelImpl } from '../base-view-model-impl';
import { AccessViewModel } from './access-view-model';

export class AccessViewModelImpl
  extends BaseViewModelImpl
  implements AccessViewModel
{
  public handleAccessAccount(): void {
    console.log('access account');
  }

  public handleSignup(): void {
    console.log('signup');
  }
}
