import { IntroductionViewModelImpl } from '@/presentation/view-models';
import { IntroductionView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';

interface MakeIntroductionViewProps {
  route: RouteProp<StackParamList, 'Introduction'>;
  navigation: any;
}

export const makeIntroductionView: React.FC<MakeIntroductionViewProps> = (
  props
) => {
  const introductionViewModel = new IntroductionViewModelImpl();
  return (
    <IntroductionView
      {...props}
      introductionViewModel={introductionViewModel}
    />
  );
};
