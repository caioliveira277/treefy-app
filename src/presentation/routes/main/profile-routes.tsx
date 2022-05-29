import {
  ChangeProfileModelImpl,
  ProfileViewModelImpl,
  HelpViewModelImpl,
  TermsUseViewModelImpl,
} from '@/presentation/view-models';
import {
  ChangeProfileView,
  ProfileView,
  HelpView,
  TermsUseView,
} from '@/presentation/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const ProfileRoutes: React.FC = () => {
  const profileViewModel = new ProfileViewModelImpl();
  const changeProfileViewModel = new ChangeProfileModelImpl();
  const helpViewModel = new HelpViewModelImpl();
  const termsUseViewModel = new TermsUseViewModelImpl();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile">
        {(props) => (
          <ProfileView {...props} profileViewModel={profileViewModel} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChangeProfile">
        {(props) => (
          <ChangeProfileView
            {...props}
            changeProfileViewModel={changeProfileViewModel}
          />
        )}
      </Stack.Screen>
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
