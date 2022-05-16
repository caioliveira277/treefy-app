import { BaseView } from '@/presentation/views/base-view';

export interface BaseViewModel {
  baseView?: BaseView;

  attachView(baseView: BaseView): void;
  detachView(): void;
  notifyViewAboutChanges(): void;
}
