import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  modalState: ModalState;

  handleModalState(state: ModalState): void;
}
