import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  makeAccessView,
  makeIntroductionView,
  makeAuthenticationView,
  makeEmailConfirmationView,
  makeChangePasswordView,
  makeCodeConfirmationView,
  makeSignupView,
} from '@/main/factories/views';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
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
        {makeCodeConfirmationView}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
