import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { PublicRoutes } from './public';
import { MainRoutes } from './main';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator<StackParamList>();
const remoteAuthentication = makeRemoteAuthentication();

export const Router: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    remoteAuthentication.getAuthenticatedUser().then((user) => {
      if (user.clientId) setIsAuthenticated(true);
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
        {!isAuthenticated ? (
          <Stack.Screen name="Public" component={PublicRoutes} />
        ) : (
          <Stack.Screen name="Main" component={MainRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
