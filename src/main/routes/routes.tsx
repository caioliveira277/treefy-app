import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticationContext from '@/presentation/contexts/authentication-context';
import { PublicRoutes } from './public';
import { MainRoutes } from './main';
import { AccountModel } from '@/domain/models';

interface RouterProps {
  authenticatedUser: AccountModel;
}

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC<RouterProps> = ({ authenticatedUser }) => {
  const authenticationContext = useContext(AuthenticationContext);

  useEffect(() => {
    authenticationContext.authentication.setAuthenticatedUser(
      authenticatedUser
    );
  }, [authenticatedUser]);

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
