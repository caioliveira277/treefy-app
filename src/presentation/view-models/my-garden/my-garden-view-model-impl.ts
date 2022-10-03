import { UserPlantModel } from '@/domain/models';
import { GetUserPlants } from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  public readonly getUserPlants: GetUserPlants;

  public modalState: ModalState;

  public userPlants: UserPlantModel[];

  public constructor(getUserPlants: GetUserPlants) {
    super();
    this.getUserPlants = getUserPlants;

    this.userPlants = [];
    this.modalState = ModalState.close;
  }

  public async handleGetUserPlants(): Promise<void> {
    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    this.userPlants = await this.getUserPlants.all({
      accessToken: user?.accessToken || '',
    });

    this.notifyViewAboutChanges();
  }

  public handleModalState(state: ModalState): void {
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
