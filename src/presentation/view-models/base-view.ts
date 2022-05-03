import { BaseView } from '@/presentation/views/base-view';

export interface BaseViewModel {
  attachView(baseView: BaseView): void;
  detachView(): void;
}
