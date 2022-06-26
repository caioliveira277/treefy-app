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
        />
        <ListComponent title="Exposição ao sol" iconName="sun" typeItem="sun" />
      </Container>
    );
  }
}
