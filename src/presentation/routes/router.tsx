import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthenticationView,
  AccessView,
  EmailConfirmationView,
  ChangePasswordView,
} from '@/presentation/views';
import {
  AuthenticationViewModelImpl,
  AccessViewModelImpl,
  EmailConfirmationViewModelImpl,
  ChangePasswordViewModelImpl,
} from '@/presentation/view-models';

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC = () => {
  const authenticationViewModel = new AuthenticationViewModelImpl();
  const accessViewModel = new AccessViewModelImpl();
  const emailConfirmationViewModel = new EmailConfirmationViewModelImpl();
  const changePasswordViewModel = new ChangePasswordViewModelImpl();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Access"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Access">
          {(props) => (
            <AccessView {...props} accessViewModel={accessViewModel} />
          )}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
