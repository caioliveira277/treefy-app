import {
  makeChangeProfileView,
  makeHelpView,
  makeProfileView,
  makeTermsUseView,
} from '@/main/factories/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const ProfileRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile">{makeProfileView}</Stack.Screen>
      <Stack.Screen name="ChangeProfile">{makeChangeProfileView}</Stack.Screen>
      <Stack.Screen name="Help">{makeHelpView}</Stack.Screen>
      <Stack.Screen name="TermsUse">{makeTermsUseView}</Stack.Screen>
    </Stack.Navigator>
  );
};
