import React from 'react';
import { MyGardenViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, spacing } from './styles';
import { HeaderComponent, NextCareComponent, ItemData } from './components';
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
];
export interface MyGardenViewProps
  extends NativeStackScreenProps<StackParamList, 'MyGarden'> {
  myGardenViewModel: MyGardenViewModel;
}

export class MyGardenView
  extends React.Component<MyGardenViewProps>
  implements BaseView<MyGardenViewProps>
{
  private myGardenViewModel: MyGardenViewModel;

  constructor(props: MyGardenViewProps) {
    super(props);

    const { myGardenViewModel } = this.props;
    this.myGardenViewModel = myGardenViewModel;
  }

  public componentDidMount(): void {
    this.myGardenViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.myGardenViewModel.detachView();
  }

  public onViewModelChanged() {}

  render() {
    return (
      <Container>
        <HeaderComponent style={spacing.header} />
        <NextCareComponent style={spacing.nextCare} data={temporaryData} />
      </Container>
    );
  }
}
