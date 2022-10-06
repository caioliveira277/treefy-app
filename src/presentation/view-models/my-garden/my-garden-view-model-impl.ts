import { UserPlantModel } from '@/domain/models';
import {
  CreateUserPlants,
  GetUserPlants,
  UpdateUserPlants,
} from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  public readonly getUserPlants: GetUserPlants;

  public readonly createUserPlants: CreateUserPlants;

  public readonly updateUserPlants: UpdateUserPlants;

  public modalState: ModalState;

  public userPlants: UserPlantModel[];

  public loadingSave: boolean;

  public currentPlant: UserPlantModel;

  public constructor(
    getUserPlants: GetUserPlants,
    createUserPlants: CreateUserPlants,
    updateUserPlants: UpdateUserPlants
  ) {
    super();
    this.getUserPlants = getUserPlants;
    this.createUserPlants = createUserPlants;
    this.updateUserPlants = updateUserPlants;

    this.userPlants = [];
    this.modalState = ModalState.close;
    this.loadingSave = false;
    this.currentPlant = {} as UserPlantModel;
  }

  public async handleGetPlants(): Promise<void> {
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
    this.currentPlant = {
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

  public async handleSavePlant(plantData: UserPlantModel): Promise<void> {
    this.handleChangeLoadingSaveState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const userPlant = await this.createUserPlants.create({
      accessToken: user?.accessToken || '',
      ...plantData,
    });

    this.userPlants = [...this.userPlants, userPlant];
    this.handleChangeModalState(ModalState.close);
    this.handleChangeLoadingSaveState(false);

    this.baseView?.props.contextConsumer?.toast?.showCustom(
      'Ótimo! Nova planta cadastrada',
      'Você acabou de cadastrar uma nova planta no seu jardim :)',
      'success'
    );
  }

  public async handleUpdatePlant(plantData: UserPlantModel): Promise<void> {
    this.handleChangeLoadingSaveState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const updatedPlant = await this.updateUserPlants.update({
      accessToken: user?.accessToken || '',
      ...plantData,
      id: plantData.id as number,
    });

    this.userPlants = this.userPlants.map((plant) =>
      plant.id === plantData.id ? updatedPlant : plant
    );

    this.handleChangeModalState(ModalState.close);
    this.handleChangeLoadingSaveState(false);
    this.baseView?.props.contextConsumer?.toast?.showCustom(
      'Show! Informações atualizadas',
      'Deu tudo certo com a atualização da sua planta :)',
      'success'
    );
  }

  public handleEditPlant(userPlant: UserPlantModel): void {
    this.currentPlant = userPlant;
    this.modalState = ModalState.open;
    this.notifyViewAboutChanges();
  }

  public handleChangeModalState(state: ModalState): void {
    this.handleClearCurrentUserPlant();
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
