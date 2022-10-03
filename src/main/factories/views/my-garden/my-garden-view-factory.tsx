import { MyGardenViewModelImpl } from '@/presentation/view-models';
import { MyGardenView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeMyGardenViewProps {
  route: RouteProp<StackParamList, 'MyGarden'>;
  navigation: any;
}

export const makeGardenView: React.FC<MakeMyGardenViewProps> = (props) => {
  const myGardenViewModel = new MyGardenViewModelImpl();
  return <MyGardenView {...props} myGardenViewModel={myGardenViewModel} />;
};
