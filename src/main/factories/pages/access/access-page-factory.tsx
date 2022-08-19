import { AccessViewModelImpl } from '@/presentation/view-models';
import { AccessView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeAccessPageProps {
  route: RouteProp<StackParamList, 'Access'>;
  navigation: any;
}

export const makeAccessPage: React.FC<MakeAccessPageProps> = (props) => {
  const accessViewModel = new AccessViewModelImpl();
  return <AccessView {...props} accessViewModel={accessViewModel} />;
};
