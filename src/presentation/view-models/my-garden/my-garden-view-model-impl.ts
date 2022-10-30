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
import { Vibration } from 'react-native';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  public readonly getUserPlants: GetUserPlants;

  public readonly getSpecies: GetSpecies;

  public readonly createUserPlants: CreateUserPlants;

  public readonly updateUserPlants: UpdateUserPlants;

  public readonly deleteUserPlants: DeleteUserPlants;

  public readonly validation: Validation;

  public modalState: ModalState;

  public userPlants: UserPlantModel[];

  public saveLoading: boolean;

  public getPlantsLoading: boolean;

  public form: UserPlantModel;

  public formErrors: MyGardenViewModel['formErrors'];

  public species: SpecieModel[];

  public getSpeciesLoading: boolean;

  public deletePlantLoading: boolean;

  public constructor(
    getUserPlants: GetUserPlants,
    getSpecies: GetSpecies,
    createUserPlants: CreateUserPlants,
    updateUserPlants: UpdateUserPlants,
    deleteUserPlants: DeleteUserPlants,
    validation: Validation
  ) {
    super();
    this.getUserPlants = getUserPlants;
    this.getSpecies = getSpecies;
    this.createUserPlants = createUserPlants;
    this.updateUserPlants = updateUserPlants;
    this.deleteUserPlants = deleteUserPlants;
    this.validation = validation;

    this.userPlants = [];
    this.modalState = ModalState.close;
    this.saveLoading = false;
    this.deletePlantLoading = false;
    this.getPlantsLoading = true;
    this.form = {} as UserPlantModel;
    this.formErrors = {} as MyGardenViewModel['formErrors'];
    this.getSpeciesLoading = true;
    this.species = [];
  }

  public async handleGetPlants(page?: number): Promise<void> {
    if (!page) {
      this.handleChangeGetPlantsLoadingState(true);
    }

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const userPlants = await this.getUserPlants.all({
      accessToken: user?.accessToken || '',
      pagination: {
        page,
      },
    });

    this.userPlants = [...this.userPlants, ...userPlants];

    this.handleChangeGetPlantsLoadingState(false);
  }

  public handleChangeForm(key: keyof UserPlantModel, value: any): void {
    this.form[key] = value as never;
    this.formErrors[key] = this.validation.validate(key, this.form);

    if (key.endsWith('Range') || key.endsWith('Times')) {
      this.formErrors = this.validation.validateAll(
        ['waterTimes', 'waterRange', 'sunTimes', 'sunRange'],
        this.form
      ).errors;
    }

    this.notifyViewAboutChanges();
  }

  private handleChangeSaveLoadingState(state: boolean): void {
    this.saveLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleChangeGetPlantsLoadingState(state: boolean): void {
    this.getPlantsLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleChangeGetSpeciesLoadingState(state: boolean): void {
    this.getSpeciesLoading = state;
    this.notifyViewAboutChanges();
  }

  private handleClearCurrentUserPlant(): void {
    Object.keys(this.form).forEach((key) => {
      this.form[key as keyof UserPlantModel] = (
        key === 'annotation' || key === 'name' ? '' : null
      ) as never;

      this.formErrors[key as keyof UserPlantModel] = '';
    });

    this.notifyViewAboutChanges();
  }

  private handleValidateForm(): boolean {
    const validation = this.validation.validateAll(
      ['name', 'sunTimes', 'sunRange', 'waterTimes', 'waterRange'],
      this.form
    );

    if (validation.hasError) {
      this.formErrors = validation.errors;
      this.notifyViewAboutChanges();
    }

    return validation.hasError;
  }

  private handleChangeDeletePlantState(state: boolean) {
    this.deletePlantLoading = state;
    this.notifyViewAboutChanges();
  }

  public async handleSavePlant(): Promise<void> {
    if (this.handleValidateForm()) return;

    this.handleChangeSaveLoadingState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const userPlant = await this.createUserPlants.create({
      accessToken: user?.accessToken || '',
      ...this.form,
    });

    this.userPlants = [...this.userPlants, userPlant];
    this.handleChangeModalState(ModalState.close);
    this.handleChangeSaveLoadingState(false);

    this.baseView?.props.contextConsumer?.toast?.showCustom(
      'Ótimo! Nova planta cadastrada',
      'Você acabou de cadastrar uma nova planta no seu jardim :)',
      'success'
    );
  }

  public async handleUpdatePlant(): Promise<void> {
    if (this.handleValidateForm()) return;

    this.handleChangeSaveLoadingState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const updatedPlant = await this.updateUserPlants.update({
      accessToken: user?.accessToken || '',
      ...this.form,
      id: this.form.id as number,
    });

    this.userPlants = this.userPlants.map((plant) =>
      plant.id === this.form.id ? updatedPlant : plant
    );

    this.handleChangeModalState(ModalState.close);
    this.handleChangeSaveLoadingState(false);
    this.baseView?.props.contextConsumer?.toast?.showCustom(
      'Show! Informações atualizadas',
      'Deu tudo certo com a atualização da sua planta :)',
      'success'
    );
  }

  private generateInformativeText(): string {
    const index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
    return [
      'Você dá amor para a sua planta e ela retribui em beleza.',
      'A planta te ensina a ser paciente e cuidadoso.',
      'O cuidado com a planta é diário, porém, muito recompensador.',
      'As plantas também se alimentam de sentimentos, cuide-as com carinho.',
      'Cultiva as plantas com amor e receba flores de presente.',
      'Plantar nos ensina que só podemos florir quando o solo é fértil e amigável.',
    ][index];
  }

  public async handleFinishPlantTask(
    selectedPlant: MyGardenItem
  ): Promise<void> {
    this.handleChangeSaveLoadingState(true);

    Vibration.vibrate(100);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const updatedPlant = await this.updateUserPlants.finish({
      accessToken: user?.accessToken || '',
      id: selectedPlant.id as number,
      type: selectedPlant.type as 'sun' | 'water',
    });

    this.userPlants = this.userPlants.map((plant) =>
      plant.id === selectedPlant.id ? updatedPlant : plant
    );

    this.handleChangeSaveLoadingState(false);

    if (!selectedPlant.started) {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Show! Tarefa iniciada',
        'Vamos te avisar quando for a hora de concluí-la :)',
        'info'
      );
    } else {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Ótimo! Tarefa concluída :)',
        this.generateInformativeText(),
        'success'
      );
    }
  }

  public async handleSearchSpecies(search: string): Promise<void> {
    this.handleChangeGetSpeciesLoadingState(true);

    const species = await this.getSpecies.byName({
      name: search,
    });

    this.species = species;
    this.handleChangeGetSpeciesLoadingState(false);
  }

  public async handleDeletePlant(selectedPlant: UserPlantModel): Promise<void> {
    this.handleChangeDeletePlantState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    const deletedPlant = await this.deleteUserPlants.delete({
      id: selectedPlant.id as number,
      accessToken: user?.accessToken || '',
    });

    if (deletedPlant) {
      this.userPlants = this.userPlants.filter(
        (plant) => plant.id !== selectedPlant.id
      );
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Ok! Deletado com sucesso',
        'Deletamos as tarefas da planta que você selecionou :)',
        'success'
      );
    } else {
      this.baseView?.props.contextConsumer?.toast?.showCustom(
        'Oops! Algo deu errado ao deletar',
        'Tivemos um problema para deletar a planta selecionada, tente novamente',
        'error'
      );
    }

    this.handleChangeDeletePlantState(false);
  }

  public handleEditPlant(userPlant: UserPlantModel): void {
    this.form = { ...userPlant };
    this.modalState = ModalState.open;
    this.notifyViewAboutChanges();
  }

  public handleChangeModalState(state: ModalState): void {
    this.handleClearCurrentUserPlant();
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
