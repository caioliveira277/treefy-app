import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicRoutes } from './public-routes';
import { MainRoutes } from './main-routes';

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Public" component={PublicRoutes} />
        <Stack.Screen name="Main" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
