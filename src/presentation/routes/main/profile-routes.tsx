import {
  ChangeProfileModelImpl,
  ProfileViewModelImpl,
} from '@/presentation/view-models';
import { ChangeProfileView, ProfileView } from '@/presentation/views';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<MainSubRoutes>();

export const ProfileRoutes: React.FC = () => {
  const profileViewModel = new ProfileViewModelImpl();
  const changeProfileViewModel = new ChangeProfileModelImpl();
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
    </Stack.Navigator>
  );
};
