import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicRoutes } from './public';
import { MainRoutes } from './main';

const Stack = createNativeStackNavigator<StackParamList>();

export const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Public" component={PublicRoutes} />
        <Stack.Screen name="Main" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
