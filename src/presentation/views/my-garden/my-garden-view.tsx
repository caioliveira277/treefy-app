import React from 'react';
import { MyGardenViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, spacing } from './styles';
import {
  HeaderComponent,
  NextCareComponent,
  ListComponent,
} from './components';
import Plant1Image from '@assets/images/plant1.png';
import Plant2Image from '@assets/images/plant2.png';

// TODO: remove after implementation
const temporaryData1 = [
  {
    key: 1,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 2,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 3,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
];
const temporaryData2 = [
  {
    key: 1,
    image: Plant2Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 2,
    image: Plant2Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 3,
    image: Plant2Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
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
        <NextCareComponent style={spacing.nextCare} />
        <ListComponent
          style={spacing.list}
          title="Regagem"
          iconName="water-drop"
          typeItem="water"
          data={temporaryData1}
        />
        <ListComponent
          title="Exposição ao sol"
          iconName="sun"
          typeItem="sun"
          data={temporaryData2}
        />
      </Container>
    );
  }
}
