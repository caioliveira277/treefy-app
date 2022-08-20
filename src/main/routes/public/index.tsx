import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemoteSignup, RemoteAuthentication } from '@/data/usecases';
import { AWSCognitoIdentityProvider } from '@/infra/aws';
import { makeAccessView, makeIntroductionView } from '@/main/factories/views';
import {
  AuthenticationView,
  EmailConfirmationView,
  ChangePasswordView,
  SignupView,
  CodeConfirmationView,
} from '@/presentation/views';
import {
  AuthenticationViewModelImpl,
  EmailConfirmationViewModelImpl,
  ChangePasswordViewModelImpl,
  SignupViewModelImpl,
  CodeConfirmationViewModelImpl,
} from '@/presentation/view-models';
import { CompositeValidator, BuilderValidator } from '@/validations';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const authenticationViewModel = new AuthenticationViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password').required().build(),
    ])
  );

  const emailConfirmationViewModel = new EmailConfirmationViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
      ...BuilderValidator.field('email').required().email().build(),
    ])
  );
  const changePasswordViewModel = new ChangePasswordViewModelImpl(
    new RemoteAuthentication(AWSCognitoIdentityProvider),
    CompositeValidator.build([
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
        {(props) => (
          <AuthenticationView
            {...props}
            authenticationViewModel={authenticationViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EmailConfirmation">
        {(props) => (
          <EmailConfirmationView
            {...props}
            emailConfirmationViewModel={emailConfirmationViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword">
        {(props) => (
          <ChangePasswordView
            {...props}
            changePasswordViewModel={changePasswordViewModel}
          />
        )}
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
