import { EmailConfirmationViewModelImpl } from '@/presentation/view-models';
import { EmailConfirmationView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '@/main/factories/usecases';

interface MakeEmailConfirmationViewProps {
  route: RouteProp<StackParamList, 'EmailConfirmation'>;
  navigation: any;
}

export const makeEmailConfirmationView: React.FC<
  MakeEmailConfirmationViewProps
> = (props) => {
  const emailConfirmationViewModel = new EmailConfirmationViewModelImpl(
    makeRemoteAuthentication(),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
    ])
  );
  return (
    <EmailConfirmationView
      {...props}
      emailConfirmationViewModel={emailConfirmationViewModel}
    />
  );
};
