import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Separator, spacing } from './styles';
import { NavigationComponent, StatusComponent } from './components';
import { ProfileViewModel } from '@/presentation/view-models';
import { ButtonComponent } from '@/presentation/components';
import { getProfile } from '@/presentation/utils';

export interface ProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'Profile'> {
  profileViewModel: ProfileViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface ProfileViewState {
  viewedArticles: number;
  countFeedback: number;
  statusLoading: boolean;
}

export class ProfileView
  extends React.Component<ProfileViewProps, ProfileViewState>
  implements BaseView
{
  private profileViewModel: ProfileViewModel;

  constructor(props: ProfileViewProps) {
    super(props);

    const { profileViewModel } = this.props;
    this.profileViewModel = profileViewModel;

    this.state = {
      countFeedback: profileViewModel.countFeedback,
      viewedArticles: profileViewModel.viewedArticles,
      statusLoading: profileViewModel.statusLoading,
    };
  }

  public componentDidMount(): void {
    this.profileViewModel.attachView(this);
    this.profileViewModel.handleGetProfileStatus();
  }

  public componentWillUnmount(): void {
    this.profileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      countFeedback: this.profileViewModel.countFeedback,
      viewedArticles: this.profileViewModel.viewedArticles,
      statusLoading: this.profileViewModel.statusLoading,
    });
  }

  render() {
    const user = this.props.contextConsumer?.authentication?.authenticatedUser;

    const { countFeedback, viewedArticles, statusLoading } = this.state;
    return (
      <ProfileLayout
        title={user?.name || ''}
        image={getProfile(user?.name || '')}
        imageRounded
      >
        <StatusComponent
          countFeedback={countFeedback}
          viewedArticles={viewedArticles}
          isLoading={statusLoading}
        />
        <Separator />
        <NavigationComponent
          user={user}
          onPress={(routeName) =>
            this.profileViewModel.handleNavigation(routeName)
          }
          style={spacing.nav}
        />
        <ButtonComponent
          type="outline"
          style={spacing.button}
          onPress={() => this.profileViewModel.handleLoggout()}
        >
          Sair
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
