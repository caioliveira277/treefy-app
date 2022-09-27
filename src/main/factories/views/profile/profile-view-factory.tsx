import { AuthenticationConsumer } from '@/presentation/contexts';
import { ProfileViewModelImpl } from '@/presentation/view-models';
import { ProfileView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteAuthentication,
  makeRemoteGetFeedbacks,
  makeRemoteGetViewedArticles,
} from '../../usecases';

interface MakeProfileViewProps {
  route: RouteProp<StackParamList, 'Profile'>;
  navigation: any;
}

export const makeProfileView: React.FC<MakeProfileViewProps> = (props) => {
  const profileViewModel = new ProfileViewModelImpl(
    makeRemoteAuthentication(),
    makeRemoteGetViewedArticles(),
    makeRemoteGetFeedbacks()
  );
  return (
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <ProfileView
          {...props}
          contextConsumer={{ ...authenticationContextParams }}
          profileViewModel={profileViewModel}
        />
      )}
    </AuthenticationConsumer>
  );
};
