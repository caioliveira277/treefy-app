import { makeGardenView } from '@/main/factories/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainRoutesParamsList>();

export const MyGardenRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyGarden"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyGarden">{makeGardenView}</Stack.Screen>
    </Stack.Navigator>
  );
};
