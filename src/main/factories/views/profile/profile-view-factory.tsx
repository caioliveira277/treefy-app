import { ProfileViewModelImpl } from '@/presentation/view-models';
import { ProfileView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '../../usecases';

interface MakeProfileViewProps {
  route: RouteProp<StackParamList, 'Profile'>;
  navigation: any;
}

export const makeProfileView: React.FC<MakeProfileViewProps> = (props) => {
  const profileViewModel = new ProfileViewModelImpl(makeRemoteAuthentication());
  return <ProfileView {...props} profileViewModel={profileViewModel} />;
};
