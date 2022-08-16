import { MyGardenViewModelImpl } from '@/presentation/view-models';
import { MyGardenView } from '@/presentation/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRoutesParamsList } from '..';

const Stack = createNativeStackNavigator<MainRoutesParamsList>();

export const MyGardenRoutes: React.FC = () => {
  const myGardenViewModel = new MyGardenViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="MyGarden"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyGarden">
        {(props) => (
          <MyGardenView {...props} myGardenViewModel={myGardenViewModel} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
