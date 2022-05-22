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
  Footer,
} from './styles';
import { ButtonComponent } from '@/presentation/components';
import { SlideControlComponent } from './components';

export interface IntrodutionViewProps
  extends NativeStackScreenProps<StackParamList, 'Introduction'> {
  introductionViewModel: IntroductionViewModel;
}

export interface IntroductionViewState {
  activeSlideIndex: number;
}

export class IntrodutionView
  extends React.Component<IntrodutionViewProps, IntroductionViewState>
  implements BaseView<IntrodutionViewProps>
{
  private introductionViewModel: IntroductionViewModel;

  private pagerViewRef: React.RefObject<PagerView>;

  constructor(props: IntrodutionViewProps) {
    super(props);

    const { introductionViewModel } = this.props;
    this.introductionViewModel = introductionViewModel;

    this.pagerViewRef = React.createRef();

    this.state = {
      activeSlideIndex: 0,
    };
  }

  public componentDidMount(): void {
    this.introductionViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.introductionViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      activeSlideIndex: this.introductionViewModel.activeSlideIndex,
    });
  }

  render() {
    const { activeSlideIndex } = this.state;
    return (
      <Container>
        <Ilustation source={blackLogo} resizeMode="cover" />
        <PagerView
          ref={this.pagerViewRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={({ nativeEvent: { position } }) => {
            this.introductionViewModel.handlePageSelected(position);
          }}
        >
          <IntroContainer key="0">
            <IntroIlustation source={introIlustration1} resizeMode="cover" />
          </IntroContainer>
          <IntroContainer key="1">
            <IntroIlustation source={introIlustration2} resizeMode="cover" />
          </IntroContainer>
          <IntroContainer key="2">
            <IntroIlustation source={introIlustration3} resizeMode="cover" />
          </IntroContainer>
        </PagerView>
        <Footer>
          <SlideControlComponent
            activeSlideIndex={activeSlideIndex}
            countOfItems={3}
            onPress={(index) => this.pagerViewRef.current?.setPage(index)}
          />
          <ButtonComponent
            style={styles.button}
            onPress={() => this.introductionViewModel.handleMoveToAccess()}
          >
            Pular apresentação
          </ButtonComponent>
        </Footer>
      </Container>
    );
  }
}
