import { TermsUseViewModelImpl } from '@/presentation/view-models';
import { TermsUseView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeTermsUseViewProps {
  route: RouteProp<StackParamList, 'TermsUse'>;
  navigation: any;
}

export const makeTermsUseView: React.FC<MakeTermsUseViewProps> = (props) => {
  const termsUseViewModel = new TermsUseViewModelImpl();
  return <TermsUseView {...props} termsUseViewModel={termsUseViewModel} />;
};
