import React from 'react';
import { MyGardenViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, spacing } from './styles';
import {
  HeaderComponent,
  NextCareComponent,
  BackdropFormComponent,
} from './components';
import { ModalState } from '@/presentation/@types/generics';
import { UserPlantModel } from '@/domain/models';
import { PageLoadingComponent } from '@/presentation/components';

export interface MyGardenViewProps
  extends NativeStackScreenProps<StackParamList, 'MyGarden'> {
  myGardenViewModel: MyGardenViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface MyGardenViewState {
  modalState: ModalState;
  userPlants: UserPlantModel[];
  form: UserPlantModel;
  formErrors: Record<keyof UserPlantModel, string>;
  saveLoading: boolean;
  getPlantsLoading: boolean;
}

export class MyGardenView
  extends React.Component<MyGardenViewProps, MyGardenViewState>
  implements BaseView
{
  private myGardenViewModel: MyGardenViewModel;

  constructor(props: MyGardenViewProps) {
    super(props);

    const { myGardenViewModel } = this.props;
    this.myGardenViewModel = myGardenViewModel;

    this.state = {
      modalState: ModalState.close,
      userPlants: myGardenViewModel.userPlants,
      saveLoading: myGardenViewModel.saveLoading,
      form: myGardenViewModel.form,
      formErrors: myGardenViewModel.formErrors,
      getPlantsLoading: myGardenViewModel.getPlantsLoading,
    };
  }

  public componentDidMount(): void {
    this.myGardenViewModel.attachView(this);
    this.myGardenViewModel.handleGetPlants();
  }

  public componentWillUnmount(): void {
    this.myGardenViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      modalState: this.myGardenViewModel.modalState,
      userPlants: this.myGardenViewModel.userPlants,
      saveLoading: this.myGardenViewModel.saveLoading,
      form: this.myGardenViewModel.form,
      formErrors: this.myGardenViewModel.formErrors,
      getPlantsLoading: this.myGardenViewModel.getPlantsLoading,
    });
  }

  render() {
    const {
      modalState,
      userPlants,
      saveLoading,
      form,
      formErrors,
      getPlantsLoading,
    } = this.state;
    return (
      <Container>
        <HeaderComponent
          style={spacing.header}
          toggleModal={(state) =>
            this.myGardenViewModel.handleChangeModalState(state)
          }
        />
        <NextCareComponent
          style={spacing.nextCare}
          loading={getPlantsLoading}
          plants={userPlants}
          onEdit={(selectedPlant) =>
            this.myGardenViewModel.handleEditPlant(selectedPlant)
          }
        />
        <BackdropFormComponent
          modalState={modalState}
          defaultData={form}
          errors={formErrors}
          onChange={(key, value) =>
            this.myGardenViewModel.handleChangeForm(key, value)
          }
          onClose={(closeState) =>
            this.myGardenViewModel.handleChangeModalState(closeState)
          }
          onSubmit={(formData) =>
            this.myGardenViewModel[
              formData.id ? 'handleUpdatePlant' : 'handleSavePlant'
            ]()
          }
        />
        {saveLoading ? <PageLoadingComponent /> : null}
      </Container>
    );
  }
}
