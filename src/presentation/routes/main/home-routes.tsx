import { HomeView } from '@/presentation/views';
import { HomeViewModelImpl } from '@/presentation/view-models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const HomeRoutes: React.FC = () => {
  const homeViewModel = new HomeViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home">
        {(props) => <HomeView {...props} homeViewModel={homeViewModel} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
