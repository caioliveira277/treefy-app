import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticationContext from '@/presentation/contexts/authentication-context';
import { PublicRoutes } from './public';
import { MainRoutes } from './main';

interface RouterProps {
  isAuthenticated: boolean;
}

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC<RouterProps> = ({ isAuthenticated }) => {
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    authenticationContext.authentication.setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated]);

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
