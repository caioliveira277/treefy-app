import React from 'react';
import { MyGardenViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, spacing } from './styles';
import {
  HeaderComponent,
  NextCareComponent,
  ItemData,
  BackdropFormComponent,
} from './components';
import { ModalState } from '@/presentation/@types/generics';
import Plant1Image from '@assets/images/plant1.png';

// TODO: remove after implementation
const temporaryData: ItemData[] = [
  {
    key: 1,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'water',
  },
  {
    key: 2,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'sun',
  },
  {
    key: 3,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'water',
  },
  {
    key: 4,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'sun',
  },
  {
    key: 5,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'water',
  },
  {
    key: 6,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'sun',
  },
  {
    key: 7,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'water',
  },
  {
    key: 8,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'sun',
  },
  {
    key: 9,
    image: Plant1Image,
    title: 'Primavera bougainvillea',
    time: 'hoje ás 12:43h',
    description: 'Vazo azul escuro ao lado da escada...',
    type: 'water',
  },
];
export interface MyGardenViewProps
  extends NativeStackScreenProps<StackParamList, 'MyGarden'> {
  myGardenViewModel: MyGardenViewModel;
}

export interface MyGardenViewState {
  modalState: ModalState;
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
    };
  }

  public componentDidMount(): void {
    this.myGardenViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.myGardenViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      modalState: this.myGardenViewModel.modalState,
    });
  }

  render() {
    const { modalState } = this.state;
    return (
      <Container>
        <HeaderComponent
          style={spacing.header}
          toggleModal={(state) =>
            this.myGardenViewModel.handleModalState(state)
          }
        />
        <NextCareComponent style={spacing.nextCare} data={temporaryData} />
        <BackdropFormComponent
          modalState={modalState}
          onClose={(closeState) =>
            this.myGardenViewModel.handleModalState(closeState)
          }
        />
      </Container>
    );
  }
}
