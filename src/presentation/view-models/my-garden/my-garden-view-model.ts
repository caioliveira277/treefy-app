import { UserPlantModel } from '@/domain/models';
import { GetUserPlants } from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  getUserPlants: GetUserPlants;

  modalState: ModalState;
  userPlants: UserPlantModel[];

  handleGetUserPlants(): Promise<void>;
  handleModalState(state: ModalState): void;
}
