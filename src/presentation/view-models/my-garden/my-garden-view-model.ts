import { UserPlantModel } from '@/domain/models';
import {
  CreateUserPlants,
  GetUserPlants,
  UpdateUserPlants,
} from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  getUserPlants: GetUserPlants;
  createUserPlants: CreateUserPlants;
  updateUserPlants: UpdateUserPlants;
  validation: Validation;

  modalState: ModalState;
  userPlants: UserPlantModel[];
  saveLoading: boolean;
  getPlantsLoading: boolean;

  form: UserPlantModel;
  formErrors: Record<keyof UserPlantModel, string>;

  handleGetPlants(): Promise<void>;
  handleChangeModalState(state: ModalState): void;
  handleChangeForm(key: keyof UserPlantModel, value: any): void;
  handleSavePlant(): Promise<void>;
  handleUpdatePlant(): Promise<void>;
  handleEditPlant(selectedPlant: UserPlantModel): void;
}
