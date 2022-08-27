import { makeChangeProfileView, makeProfileView } from '@/main/factories/views';
import {
  HelpViewModelImpl,
  TermsUseViewModelImpl,
} from '@/presentation/view-models';
import { HelpView, TermsUseView } from '@/presentation/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const ProfileRoutes: React.FC = () => {
  const helpViewModel = new HelpViewModelImpl();
  const termsUseViewModel = new TermsUseViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile">{makeProfileView}</Stack.Screen>
      <Stack.Screen name="ChangeProfile">{makeChangeProfileView}</Stack.Screen>
      <Stack.Screen name="Help">
        {(props) => <HelpView {...props} helpViewModel={helpViewModel} />}
      </Stack.Screen>
      <Stack.Screen name="TermsUse">
        {(props) => (
          <TermsUseView {...props} termsUseViewModel={termsUseViewModel} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
