import { UserPlantModel } from '@/domain/models';
import {
  CreateUserPlants,
  GetUserPlants,
  UpdateUserPlants,
} from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  getUserPlants: GetUserPlants;
  createUserPlants: CreateUserPlants;
  updateUserPlants: UpdateUserPlants;

  modalState: ModalState;
  userPlants: UserPlantModel[];
  currentPlant: UserPlantModel;
  loadingSave: boolean;

  handleGetPlants(): Promise<void>;
  handleChangeModalState(state: ModalState): void;
  handleSavePlant(plantData: UserPlantModel): Promise<void>;
  handleUpdatePlant(plantData: UserPlantModel): Promise<void>;
  handleEditPlant(selectedPlant: UserPlantModel): void;
}
