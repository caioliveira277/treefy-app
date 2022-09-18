import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { Separator, spacing } from './styles';
import { NavigationComponent, StatusComponent } from './components';
import { ProfileViewModel } from '@/presentation/view-models';
import { ButtonComponent } from '@/presentation/components';
import { getProfile } from '@/presentation/utils';
import { AccountModel } from '@/domain/models';

export interface ProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'Profile'> {
  profileViewModel: ProfileViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface ProfileViewState {
  viewedArticles: number;
  countFeedback: number;
  authenticatedUser: AccountModel;
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
      authenticatedUser: profileViewModel.authenticatedUser,
    };
  }

  public componentDidMount(): void {
    this.profileViewModel.attachView(this);
    this.profileViewModel.handleGetAuthenticatedUser();
  }

  public componentWillUnmount(): void {
    this.profileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      countFeedback: this.state.countFeedback,
      viewedArticles: this.state.viewedArticles,
    });
  }

  render() {
    const { authenticatedUser } = this.state;
    return (
      <ProfileLayout
        title={authenticatedUser.name}
        image={getProfile(authenticatedUser.name)}
        imageRounded
      >
        <StatusComponent />
        <Separator />
        <NavigationComponent
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
