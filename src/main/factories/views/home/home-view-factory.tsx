import { HomeViewModelImpl } from '@/presentation/view-models';
import { HomeView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteGetArticles,
  makeRemoteGetCategories,
  makeRemoteAuthentication,
} from '@/main/factories/usecases';
import { AuthenticationConsumer } from '@/presentation/contexts';

interface MakeHomeViewProps {
  route: RouteProp<StackParamList, 'Home'>;
  navigation: any;
}

export const makeHomeView: React.FC<MakeHomeViewProps> = (props) => {
  const homeViewModel = new HomeViewModelImpl(
    makeRemoteGetCategories(),
    makeRemoteGetArticles(),
    makeRemoteAuthentication()
  );
  return (
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <HomeView
          contextConsumer={{
            ...authenticationContextParams,
          }}
          {...props}
          homeViewModel={homeViewModel}
        />
      )}
    </AuthenticationConsumer>
  );
};
