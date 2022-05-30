import { ProfileRoutes } from './profile-routes';
import { HomeRoutes } from './home-routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import { useTheme } from 'styled-components';

import userActiveImage from '@assets/icons/navbar/user-active.png';
import userInactiveImage from '@assets/icons/navbar/user-inactive.png';
import homeActiveImage from '@assets/icons/navbar/home-active.png';
import homeInactiveImage from '@assets/icons/navbar/home-inactive.png';
import plantActiveImage from '@assets/icons/navbar/plant-active.png';
import plantInactiveImage from '@assets/icons/navbar/plant-inactive.png';

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
                source={focused ? userActiveImage : userInactiveImage}
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
                source={focused ? homeActiveImage : homeInactiveImage}
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
        name="MyGarden"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={focused ? plantActiveImage : plantInactiveImage}
                resizeMode="center"
                width={19}
                height={19}
              />
              <ActivePoint focused={focused} />
            </>
          ),
        }}
      >
        {() => (
          <View
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}
          >
            <Text>My garden</Text>
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
