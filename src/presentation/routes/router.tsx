import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticationView, AccessView } from '@/presentation/views';
import {
  AuthenticationViewModelImpl,
  AccessViewModelImpl,
} from '@/presentation/view-models';

type StackParamList = {
  Access: undefined;
  Authentication: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC = () => {
  const authenticationViewModel = new AuthenticationViewModelImpl();
  const accessViewModel = new AccessViewModelImpl();
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
