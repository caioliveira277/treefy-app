import { AuthenticationViewModelImpl } from '@/presentation/view-models';
import { AuthenticationView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { AuthenticationConsumer, ToastConsumer } from '@/presentation/contexts';

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
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <ToastConsumer>
          {(toastType) => (
            <AuthenticationView
              {...props}
              contextConsumer={{
                ...authenticationContextParams,
                toast: toastType,
              }}
              authenticationViewModel={authenticationViewModel}
            />
          )}
        </ToastConsumer>
      )}
    </AuthenticationConsumer>
  );
};
