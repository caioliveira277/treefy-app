import { HomeViewModelImpl } from '@/presentation/view-models';
import { HomeView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteGetCategories } from '@/main/factories/usecases';

interface MakeHomeViewProps {
  route: RouteProp<StackParamList, 'Home'>;
  navigation: any;
}

export const makeHomeView: React.FC<MakeHomeViewProps> = (props) => {
  const homeViewModel = new HomeViewModelImpl(makeRemoteGetCategories());
  return <HomeView {...props} homeViewModel={homeViewModel} />;
};
