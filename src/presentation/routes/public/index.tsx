import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthenticationView,
  AccessView,
  EmailConfirmationView,
  ChangePasswordView,
  SignupView,
  IntrodutionView,
  CodeConfirmationView,
} from '@/presentation/views';
import {
  AuthenticationViewModelImpl,
  AccessViewModelImpl,
  EmailConfirmationViewModelImpl,
  ChangePasswordViewModelImpl,
  SignupViewModelImpl,
  IntroductionViewModelImpl,
  CodeConfirmationViewModelImpl,
} from '@/presentation/view-models';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const authenticationViewModel = new AuthenticationViewModelImpl();
  const accessViewModel = new AccessViewModelImpl();
  const emailConfirmationViewModel = new EmailConfirmationViewModelImpl();
  const changePasswordViewModel = new ChangePasswordViewModelImpl();
  const signupViewModel = new SignupViewModelImpl();
  const introductionViewModel = new IntroductionViewModelImpl();
  const codeConfirmationViewModel = new CodeConfirmationViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="Introduction"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Introduction">
        {(props) => (
          <IntrodutionView
            {...props}
            introductionViewModel={introductionViewModel}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Access">
        {(props) => <AccessView {...props} accessViewModel={accessViewModel} />}
      </Stack.Screen>
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
