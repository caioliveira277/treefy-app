import { CodeConfirmationViewModelImpl } from '@/presentation/view-models';
import { CodeConfirmationView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteAuthentication,
  makeRemoteSignup,
} from '@/main/factories/usecases';

interface MakeCodeConfirmationProps {
  route: RouteProp<StackParamList, 'CodeConfirmation'>;
  navigation: any;
}

export const makeCodeConfirmationView: React.FC<MakeCodeConfirmationProps> = (
  props
) => {
  const codeConfirmationViewModel = new CodeConfirmationViewModelImpl(
    makeRemoteSignup(),
    makeRemoteAuthentication(),
    CompositeValidator.build([
      ...BuilderValidator.field('code').required().minLength(5).build(),
    ])
  );
  return (
    <CodeConfirmationView
      {...props}
      codeConfirmationViewModel={codeConfirmationViewModel}
    />
  );
};
