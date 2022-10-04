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

  public loadingSave: boolean;

  public currentUserPlant: UserPlantModel;

  public constructor(
    getUserPlants: GetUserPlants,
    createUserPlants: CreateUserPlants
  ) {
    super();
    this.getUserPlants = getUserPlants;
    this.createUserPlants = createUserPlants;

    this.userPlants = [];
    this.modalState = ModalState.close;
    this.loadingSave = false;
    this.currentUserPlant = {} as UserPlantModel;
  }

  public async handleGetUserPlants(): Promise<void> {
    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    this.userPlants = await this.getUserPlants.all({
      accessToken: user?.accessToken || '',
    });

    this.notifyViewAboutChanges();
  }

  private handleChangeLoadingSaveState(state: boolean): void {
    this.loadingSave = state;
    this.notifyViewAboutChanges();
  }

  private handleClearCurrentUserPlant(): void {
    this.currentUserPlant = {
      id: null,
      specieId: null,
      name: '',
      annotation: '',
      sunRange: null,
      sunTimes: null,
      waterRange: null,
      waterTimes: null,
    };
    this.notifyViewAboutChanges();
  }

  public async handleSaveUserPlant(
    formData: Omit<UserPlantModel, 'id' | 'specieId'>
  ): Promise<void> {
    this.handleChangeLoadingSaveState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const userPlant = await this.createUserPlants.create({
      accessToken: user?.accessToken || '',
      ...formData,
    });

    this.userPlants.push(userPlant);
    this.handleModalState(ModalState.close);
    this.handleChangeLoadingSaveState(false);

    this.baseView?.props.contextConsumer?.toast?.showCustom(
      'Show! Nova planta cadastrada!',
      'Você acabou de cadastrar uma nova planta no seu jardim :)',
      'success'
    );
  }

  public handleModalState(state: ModalState): void {
    this.handleClearCurrentUserPlant();
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
