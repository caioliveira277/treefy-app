import { SpecieModel, UserPlantModel } from '@/domain/models';
import {
  CreateUserPlants,
  DeleteUserPlants,
  GetSpecies,
  GetUserPlants,
  UpdateUserPlants,
} from '@/domain/usecases';
import { ModalState, MyGardenItem } from '@/presentation/@types/generics';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModel } from '../base-view-model';

export interface MyGardenViewModel extends BaseViewModel {
  getUserPlants: GetUserPlants;
  createUserPlants: CreateUserPlants;
  updateUserPlants: UpdateUserPlants;
  deleteUserPlants: DeleteUserPlants;
  validation: Validation;
  getSpecies: GetSpecies;

  modalState: ModalState;
  userPlants: UserPlantModel[];
  species: SpecieModel[];
  saveLoading: boolean;
  getPlantsLoading: boolean;
  getSpeciesLoading: boolean;
  deletePlantLoading: boolean;

  form: UserPlantModel;
  formErrors: Record<keyof UserPlantModel, string>;

  handleSearchSpecies(search: string): Promise<void>;
  handleGetPlants(page?: number): Promise<void>;
  handleChangeModalState(state: ModalState): void;
  handleChangeForm(key: keyof UserPlantModel, value: any): void;
  handleSavePlant(): Promise<void>;
  handleUpdatePlant(): Promise<void>;
  handleDeletePlant(selectedPlant: UserPlantModel): Promise<void>;
  handleFinishPlantTask(selectedPlant: MyGardenItem): Promise<void>;
  handleEditPlant(selectedPlant: UserPlantModel): void;
}
