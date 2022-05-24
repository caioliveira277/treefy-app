import { ProfileViewModel } from './profile-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';

export class ProfileViewModelImpl
  extends BaseViewModelImpl
  implements ProfileViewModel
{
  public completeName: string;

  public viewedArticles: number;

  public countFeedback: number;

  constructor() {
    super();
    this.completeName = '';
    this.viewedArticles = 0;
    this.countFeedback = 0;
  }

  public handleLoggout(): void {
    console.log('loggout');
  }
}
