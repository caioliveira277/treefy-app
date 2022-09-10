import { ArticleView } from '@/presentation/views';
import { ArticleViewModelImpl } from '@/presentation/view-models';
import { makeHomeView } from '@/main/factories/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const HomeRoutes: React.FC = () => {
  const articleViewModel = new ArticleViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home">{makeHomeView}</Stack.Screen>
      <Stack.Screen name="Article">
        {(props) => (
          <ArticleView {...props} articleViewModel={articleViewModel} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
