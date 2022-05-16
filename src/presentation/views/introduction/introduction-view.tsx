import React from 'react';
import PagerView from 'react-native-pager-view';
import { IntroductionViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import blackLogo from '@assets/images/black-logo.png';
import introIlustration1 from '@assets/images/intro-ilustration-1.png';
import introIlustration2 from '@assets/images/intro-ilustration-2.png';
import introIlustration3 from '@assets/images/intro-ilustration-3.png';
import {
  Container,
  IntroContainer,
  Ilustation,
  IntroIlustation,
  styles,
} from './styles';
import { ButtonComponent } from '@/presentation/components';

export interface IntrodutionViewProps
  extends NativeStackScreenProps<StackParamList, 'Introduction'> {
  introductionViewModel: IntroductionViewModel;
}

export class IntrodutionView
  extends React.Component<IntrodutionViewProps>
  implements BaseView<IntrodutionViewProps>
{
  private introductionViewModel: IntroductionViewModel;

  constructor(props: IntrodutionViewProps) {
    super(props);

    const { introductionViewModel } = this.props;
    this.introductionViewModel = introductionViewModel;
  }

  public componentDidMount(): void {
    this.introductionViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.introductionViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return (
      <Container>
        <Ilustation source={blackLogo} resizeMode="cover" />
        <PagerView style={styles.pagerView} initialPage={0}>
          <IntroContainer key="1">
            <IntroIlustation source={introIlustration1} resizeMode="cover" />
          </IntroContainer>
          <IntroContainer key="2">
            <IntroIlustation source={introIlustration2} resizeMode="cover" />
          </IntroContainer>
          <IntroContainer key="3">
            <IntroIlustation source={introIlustration3} resizeMode="cover" />
          </IntroContainer>
        </PagerView>
        <ButtonComponent
          style={styles.button}
          onPress={() => this.introductionViewModel.handleMoveToAccess()}
        >
          Pular apresentação
        </ButtonComponent>
      </Container>
    );
  }
}
