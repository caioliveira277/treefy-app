import { UserPlantModel } from '@/domain/models';
import {
  CreateUserPlants,
  GetUserPlants,
  UpdateUserPlants,
} from '@/domain/usecases';
import { ModalState } from '@/presentation/@types/generics';
import { Validation } from '@/presentation/protocols/validation';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { MyGardenViewModel } from './my-garden-view-model';

export class MyGardenViewModelImpl
  extends BaseViewModelImpl
  implements MyGardenViewModel
{
  public readonly getUserPlants: GetUserPlants;

  public readonly createUserPlants: CreateUserPlants;

  public readonly updateUserPlants: UpdateUserPlants;

  public readonly validation: Validation;

  public modalState: ModalState;

  public userPlants: UserPlantModel[];

  public saveLoading: boolean;

  public getPlantsLoading: boolean;

  public form: UserPlantModel;

  public formErrors: MyGardenViewModel['formErrors'];

  public constructor(
    getUserPlants: GetUserPlants,
    createUserPlants: CreateUserPlants,
    updateUserPlants: UpdateUserPlants,
    validation: Validation
  ) {
    super();
    this.getUserPlants = getUserPlants;
    this.createUserPlants = createUserPlants;
    this.updateUserPlants = updateUserPlants;
    this.validation = validation;

    this.userPlants = [];
    this.modalState = ModalState.close;
    this.saveLoading = false;
    this.getPlantsLoading = true;
    this.form = {} as UserPlantModel;
    this.formErrors = {} as MyGardenViewModel['formErrors'];
  }

  public async handleGetPlants(): Promise<void> {
    this.handleChangeGetPlantsLoadingState(true);

    const user =
      this.baseView?.props.contextConsumer?.authentication?.authenticatedUser;

    this.userPlants = await this.getUserPlants.all({
      accessToken: user?.accessToken || '',
    });

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

  public handleEditPlant(userPlant: UserPlantModel): void {
    this.form = userPlant;
    this.modalState = ModalState.open;
    this.notifyViewAboutChanges();
  }

  public handleChangeModalState(state: ModalState): void {
    this.handleClearCurrentUserPlant();
    this.modalState = state;
    this.notifyViewAboutChanges();
  }
}
