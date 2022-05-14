import React from 'react';
import { ButtonComponent } from '@/presentation/components';
import { AccessViewModel } from '@/presentation/view-models';
import { Container } from './styles';
// import initialIlustration from '@assets/images/initial-ilustration.png';
import { BaseView } from '../base-view';

export interface AccessViewProps {
  accessViewModel: AccessViewModel;
}

export class AccessView
  extends React.Component<AccessViewProps>
  implements BaseView
{
  private accessViewModel: AccessViewModel;

  constructor(props: AccessViewProps) {
    super(props);

    const { accessViewModel } = this.props;
    this.accessViewModel = accessViewModel;
  }

  public componentDidMount(): void {
    this.accessViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.accessViewModel.detachView();
  }

  public onViewModelChanged() {}

  render() {
    return (
      <Container>
        <ButtonComponent
          onPress={() => this.accessViewModel.handleAccessAccount}
        >
          Acessar conta
        </ButtonComponent>
      </Container>
    );
  }
}
