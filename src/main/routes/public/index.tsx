import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemoteSignup, RemoteAuthentication } from '@/data/usecases';
import { AWSCognitoIdentityProvider } from '@/infra/aws';
import {
  makeAccessView,
  makeIntroductionView,
  makeAuthenticationView,
  makeEmailConfirmationView,
  makeChangePasswordView,
} from '@/main/factories/views';
import { CodeConfirmationView } from '@/presentation/views';
import { CodeConfirmationViewModelImpl } from '@/presentation/view-models';
import { CompositeValidator, BuilderValidator } from '@/validations';
import { makeSignupView } from '@/main/factories/views/signup/signup-view-factory';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const codeConfirmationViewModel = new CodeConfirmationViewModelImpl(
    new RemoteSignup(AWSCognitoIdentityProvider),
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('code').required().minLength(5).build(),
    ])
  );
  return (
    <Stack.Navigator
      initialRouteName="Introduction"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="Introduction">{makeIntroductionView}</Stack.Screen>
      <Stack.Screen name="Access">{makeAccessView}</Stack.Screen>
      <Stack.Screen name="Authentication">
        {makeAuthenticationView}
      </Stack.Screen>
      <Stack.Screen name="EmailConfirmation">
        {makeEmailConfirmationView}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword">
        {makeChangePasswordView}
      </Stack.Screen>
      <Stack.Screen name="Signup">{makeSignupView}</Stack.Screen>
      <Stack.Screen name="CodeConfirmation">
        {(props) => (
          <CodeConfirmationView
            {...props}
            codeConfirmationViewModel={codeConfirmationViewModel}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
