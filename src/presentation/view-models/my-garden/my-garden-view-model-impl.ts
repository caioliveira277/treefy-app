import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  modalState: ModalState;

  public constructor() {
    super();
    this.modalState = ModalState.close;
  }

  public handleModalState(state: ModalState): void {
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
