import { BaseView } from '@/presentation/views/base-view';
import { BaseViewModel } from './base-view-model';

export class BaseViewModelImpl implements BaseViewModel {
  public baseView?: BaseView;

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public notifyViewAboutChanges(): void {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  }
}
