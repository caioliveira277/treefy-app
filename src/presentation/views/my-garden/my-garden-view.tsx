import React from 'react';
import { MyGardenViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container, spacing } from './styles';
import { HeaderComponent, NextCareComponent } from './components';

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
        <NextCareComponent />
      </Container>
    );
  }
}
