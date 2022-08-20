import { AuthenticationViewModelImpl } from '@/presentation/view-models';
import { AuthenticationView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '@/main/factories/usecases';

interface MakeAuthenticationViewProps {
  route: RouteProp<StackParamList, 'Authentication'>;
  navigation: any;
}

export const makeAuthenticationView: React.FC<MakeAuthenticationViewProps> = (
  props
) => {
  const authenticationViewModel = new AuthenticationViewModelImpl(
    makeRemoteAuthentication(),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password').required().build(),
    ])
  );
  return (
    <AuthenticationView
      {...props}
      authenticationViewModel={authenticationViewModel}
    />
  );
};
