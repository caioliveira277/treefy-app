import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Container } from './styles';
import { ProfileViewModel } from '@/presentation/view-models';

export interface ProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'Profile'> {
  profileViewModel: ProfileViewModel;
}

export interface ProfileViewState {
  completeName: string;
  viewedArticles: number;
  countFeedback: number;
}

export class ProfileView
  extends React.Component<ProfileViewProps, ProfileViewState>
  implements BaseView<ProfileViewProps>
{
  private profileViewModel: ProfileViewModel;

  constructor(props: ProfileViewProps) {
    super(props);

    const { profileViewModel } = this.props;
    this.profileViewModel = profileViewModel;

    this.state = {
      countFeedback: 0,
      viewedArticles: 0,
      completeName: '',
    };
  }

  public componentDidMount(): void {
    this.profileViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.profileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      completeName: this.state.completeName,
      countFeedback: this.state.countFeedback,
      viewedArticles: this.state.viewedArticles,
    });
  }

  render() {
    // const { completeName, countFeedback, viewedArticles } = this.state;
    return <Container></Container>;
  }
}
