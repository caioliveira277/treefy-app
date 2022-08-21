import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { PublicRoutes } from './public';
import { MainRoutes } from './main';
import { useContext, useEffect } from 'react';
import AuthenticationContext from '@/presentation/contexts/authentication-context';

const Stack = createNativeStackNavigator<StackParamList>();
const remoteAuthentication = makeRemoteAuthentication();

export const Router: React.FC = () => {
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    remoteAuthentication.getAuthenticatedUser().then((user) => {
      if (user.clientId)
        authenticationContext.authentication.setIsAuthenticated(true);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {!authenticationContext.authentication.isAuthenticated ? (
          <Stack.Screen name="Public" component={PublicRoutes} />
        ) : (
          <Stack.Screen name="Main" component={MainRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
