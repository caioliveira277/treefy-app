import { BaseViewModelImpl } from '../base-view-model-impl';
import { AccessViewModel } from './access-view-model';

export class AccessViewModelImpl
  extends BaseViewModelImpl
  implements AccessViewModel
{
  public handleAccessAccount(): void {
    this.baseView?.props.navigation?.navigate('Authentication');
  }

  public handleSignup(): void {
    // this.baseView?.navigation.navigate('Access');
    console.log('signup');
  }
}
