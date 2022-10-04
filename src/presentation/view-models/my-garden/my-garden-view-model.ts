import { UserPlantModel } from '@/domain/models';
import { CreateUserPlants, GetUserPlants } from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  getUserPlants: GetUserPlants;
  createUserPlants: CreateUserPlants;

  modalState: ModalState;
  userPlants: UserPlantModel[];

  handleGetUserPlants(): Promise<void>;
  handleModalState(state: ModalState): void;
  handleSaveUserPlant(
    formData: Omit<UserPlantModel, 'id' | 'specieId'>
  ): Promise<void>;
}
