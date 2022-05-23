import { HomeView } from '@/presentation/views';
import { HomeViewModelImpl } from '@/presentation/view-models';
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
  const homeViewModel = new HomeViewModelImpl();
  const theme = useTheme();
  const ActivePoint: React.FC<{ focused: boolean; topPosition?: number }> = ({
    focused,
    topPosition = -4,
  }) =>
    focused ? (
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 12,
          borderWidth: 1.5,
          top: topPosition,
          borderColor: theme.colors.secondary,
          backgroundColor: theme.colors.primary,
        }}
      />
    ) : null;
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={focused ? userActiveImage : userInactiveImage}
                resizeMode="center"
                width={12}
                height={12}
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
            <Text>Profile</Text>
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={focused ? homeActiveImage : homeInactiveImage}
                resizeMode="center"
                width={19}
                height={19}
              />
              <ActivePoint focused={focused} />
            </>
          ),
        }}
      >
        {(props) => <HomeView {...props} homeViewModel={homeViewModel} />}
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
              <ActivePoint focused={focused} topPosition={-7} />
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
