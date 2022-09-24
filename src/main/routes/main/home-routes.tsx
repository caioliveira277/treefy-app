import { makeArticleView, makeHomeView } from '@/main/factories/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const HomeRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home">{makeHomeView}</Stack.Screen>
      <Stack.Screen name="Article">{makeArticleView}</Stack.Screen>
    </Stack.Navigator>
  );
};
