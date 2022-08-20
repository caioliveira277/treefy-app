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
import { SignupView, CodeConfirmationView } from '@/presentation/views';
import {
  SignupViewModelImpl,
  CodeConfirmationViewModelImpl,
} from '@/presentation/view-models';
import { CompositeValidator, BuilderValidator } from '@/validations';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const signupViewModel = new SignupViewModelImpl(
    new RemoteSignup(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('completeName')
        .required()
        .completeName()
        .build(),
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password')
        .required()
        .minLength(5)
        .containsLowercase()
        .containsUppercase()
        .containsNumber()
        .build(),
      ...BuilderValidator.field('confirmPassword')
        .required()
        .sameAs('password', 'Senha')
        .build(),
    ])
  );
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
      <Stack.Screen name="Signup">
        {(props) => <SignupView {...props} signupViewModel={signupViewModel} />}
      </Stack.Screen>
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
