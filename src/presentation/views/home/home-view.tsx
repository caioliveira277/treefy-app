import React from 'react';
import { HomeViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import {
  Container,
  ContainerProfile,
  ImageProfile,
  ProfileSalute,
  ProfileSaluteContainer,
} from './styles';
// TODO: remove image after implementation
import temporaryImageProfile from '@assets/images/profile.png';

export interface HomeViewProps
  extends NativeStackScreenProps<StackParamList, 'Home'> {
  homeViewModel: HomeViewModel;
}

export interface HomeViewState {}

export class HomeView
  extends React.Component<HomeViewProps, HomeViewState>
  implements BaseView<HomeViewProps>
{
  private homeViewModel: HomeViewModel;

  constructor(props: HomeViewProps) {
    super(props);

    const { homeViewModel } = this.props;
    this.homeViewModel = homeViewModel;
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  onViewModelChanged(): void {}

  render() {
    return (
      <Container>
        <ContainerProfile>
          <ImageProfile source={temporaryImageProfile} />
          <ProfileSaluteContainer>
            <ProfileSalute>Olá Vanessa,</ProfileSalute>
            <ProfileSalute>que bom que voltou 🌱</ProfileSalute>
          </ProfileSaluteContainer>
        </ContainerProfile>
      </Container>
    );
  }
}
