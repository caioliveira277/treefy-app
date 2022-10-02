import { HelpViewModelImpl } from '@/presentation/view-models';
import { HelpView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeHelpViewProps {
  route: RouteProp<StackParamList, 'Help'>;
  navigation: any;
}

export const makeHelpView: React.FC<MakeHelpViewProps> = (props) => {
  const helpViewModel = new HelpViewModelImpl();
  return <HelpView {...props} helpViewModel={helpViewModel} />;
};
