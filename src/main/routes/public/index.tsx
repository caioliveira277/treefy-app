import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  makeAccessView,
  makeIntroductionView,
  makeAuthenticationView,
  makeEmailConfirmationView,
  makeChangePasswordView,
  makeCodeConfirmationView,
  makeSignupView,
} from '@/main/factories/views';
import { useContext, useEffect, useState } from 'react';
import IntroductionContext from '@/presentation/contexts/introduction-context';

const Stack = createNativeStackNavigator<StackParamList>();

export const PublicRoutes: React.FC = () => {
  const introductionContext = useContext(IntroductionContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    introductionContext.introduction.setAlreadyViewedByStorage().finally(() => {
      if (isMounted) setIsReady(true);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return isReady ? (
    <Stack.Navigator
      initialRouteName="Introduction"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      {introductionContext.introduction.alreadyViewed ? null : (
        <Stack.Screen name="Introduction">{makeIntroductionView}</Stack.Screen>
      )}

      <Stack.Screen name="Access">{makeAccessView}</Stack.Screen>
      <Stack.Screen name="Authentication">
        {makeAuthenticationView}
      </Stack.Screen>
      <Stack.Screen name="EmailConfirmation">
        {makeEmailConfirmationView}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword">
        {makeChangePasswordView}
      </Stack.Screen>
      <Stack.Screen name="Signup">{makeSignupView}</Stack.Screen>
      <Stack.Screen name="CodeConfirmation">
        {makeCodeConfirmationView}
      </Stack.Screen>
    </Stack.Navigator>
  ) : null;
};
