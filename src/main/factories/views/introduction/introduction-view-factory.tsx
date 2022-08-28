import { IntroductionViewModelImpl } from '@/presentation/view-models';
import { IntroductionView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { IntroductionConsumer } from '@/presentation/contexts';

interface MakeIntroductionViewProps {
  route: RouteProp<StackParamList, 'Introduction'>;
  navigation: any;
}

export const makeIntroductionView: React.FC<MakeIntroductionViewProps> = (
  props
) => {
  const introductionViewModel = new IntroductionViewModelImpl();
  return (
    <IntroductionConsumer>
      {(introductionContextParams) => (
        <IntroductionView
          {...props}
          contextConsumer={introductionContextParams}
          introductionViewModel={introductionViewModel}
        />
      )}
    </IntroductionConsumer>
  );
};
