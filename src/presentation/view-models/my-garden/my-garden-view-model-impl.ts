import { UserPlantModel } from '@/domain/models';
import { CreateUserPlants, GetUserPlants } from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  public readonly getUserPlants: GetUserPlants;

  public readonly createUserPlants: CreateUserPlants;

  public modalState: ModalState;

  public userPlants: UserPlantModel[];

  public constructor(
    getUserPlants: GetUserPlants,
    createUserPlants: CreateUserPlants
  ) {
    super();
    this.getUserPlants = getUserPlants;
    this.createUserPlants = createUserPlants;

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

  public async handleSaveUserPlant(
    formData: Omit<UserPlantModel, 'id' | 'specieId'>
  ): Promise<void> {
    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const userPlant = await this.createUserPlants.create({
      accessToken: user?.accessToken || '',
      ...formData,
    });

    this.userPlants.push(userPlant);
    this.notifyViewAboutChanges();
  }

  public handleModalState(state: ModalState): void {
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
