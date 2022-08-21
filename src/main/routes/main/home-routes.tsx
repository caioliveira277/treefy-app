import { HomeView, ArticleView } from '@/presentation/views';
import {
  HomeViewModelImpl,
  ArticleViewModelImpl,
} from '@/presentation/view-models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainSubRoutes } from '..';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const HomeRoutes: React.FC = () => {
  const homeViewModel = new HomeViewModelImpl();
  const articleViewModel = new ArticleViewModelImpl();
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
      <Stack.Screen name="Article">
        {(props) => (
          <ArticleView {...props} articleViewModel={articleViewModel} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
