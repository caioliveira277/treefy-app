import { AccessViewModelImpl } from '@/presentation/view-models';
import { AccessView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeAccessViewProps {
  route: RouteProp<StackParamList, 'Access'>;
  navigation: any;
}

export const makeAccessView: React.FC<MakeAccessViewProps> = (props) => {
  const accessViewModel = new AccessViewModelImpl();
  return <AccessView {...props} accessViewModel={accessViewModel} />;
};
