import { ProfileRoutes } from './profile-routes';
import { HomeRoutes } from './home-routes';
import { MyGardenRoutes } from './my-garden-routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import { useTheme } from 'styled-components';
import { getIcon } from '@/presentation/utils';

const Tab = createBottomTabNavigator<StackParamList>();

export const MainRoutes: React.FC = () => {
  const theme = useTheme();
  const ActivePoint: React.FC<{
    focused: boolean;
    topPosition?: number;
    marginLeft?: number;
  }> = ({ focused, topPosition = -7, marginLeft = 0 }) =>
    focused ? (
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 12,
          borderWidth: 1.5,
          top: topPosition,
          marginLeft: marginLeft,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.primary,
        }}
      />
    ) : null;
  return (
    <Tab.Navigator
      initialRouteName="HomeGroup"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: theme.colors.contrast,
          ...theme.shadows.sm,
        },
      }}
    >
      <Tab.Screen
        name="ProfileGroup"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={
                  focused ? getIcon('user-active') : getIcon('user-inactive')
                }
                resizeMode="center"
                width={12}
                height={12}
              />
              <ActivePoint focused={focused} marginLeft={2} />
            </>
          ),
        }}
      >
        {() => <ProfileRoutes />}
      </Tab.Screen>
      <Tab.Screen
        name="HomeGroup"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={
                  focused ? getIcon('home-active') : getIcon('home-inactive')
                }
                resizeMode="center"
                width={19}
                height={19}
              />
              <ActivePoint focused={focused} topPosition={-4} />
            </>
          ),
        }}
      >
        {() => <HomeRoutes />}
      </Tab.Screen>
      <Tab.Screen
        name="MyGardenGroup"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={
                  focused ? getIcon('plant-active') : getIcon('plant-inactive')
                }
                resizeMode="center"
                width={19}
                height={19}
              />
              <ActivePoint focused={focused} />
            </>
          ),
        }}
      >
        {() => <MyGardenRoutes />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
