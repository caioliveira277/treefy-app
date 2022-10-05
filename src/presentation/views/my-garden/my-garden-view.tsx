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
  currentPlant: UserPlantModel;
  loadingSave: boolean;
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
      loadingSave: myGardenViewModel.loadingSave,
      currentPlant: myGardenViewModel.currentPlant,
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
      loadingSave: this.myGardenViewModel.loadingSave,
      currentPlant: this.myGardenViewModel.currentPlant,
    });
  }

  render() {
    const { modalState, userPlants, loadingSave, currentPlant } = this.state;
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
          plants={userPlants}
          onEdit={(selectedPlant) =>
            this.myGardenViewModel.handleEditPlant(selectedPlant)
          }
        />
        <BackdropFormComponent
          modalState={modalState}
          currentPlant={currentPlant}
          onClose={(closeState) =>
            this.myGardenViewModel.handleChangeModalState(closeState)
          }
          onSubmit={(formData) =>
            this.myGardenViewModel.handleSavePlant(formData)
          }
        />
        {loadingSave ? <PageLoadingComponent /> : null}
      </Container>
    );
  }
}
