import 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { currentTheme } from '@/presentation/themes';
import { Router } from '@/main/routes/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AWSCognitoIdentityProvider } from '@/infra/aws';
import {
  AuthenticationProvider,
  IntroductionProvider,
  ToastProvider,
} from '@/presentation/contexts';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';
import { AccountModel } from '@/domain/models';
import { registerForPushNotificationsAsync } from './factories/services';

AWSCognitoIdentityProvider.configure();
SplashScreen.preventAutoHideAsync();

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<AccountModel>(
    {} as AccountModel
  );
  const [appIsReady, setAppIsReady] = useState(false);
  const remoteAuthentication = makeRemoteAuthentication();
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    registerForPushNotificationsAsync();
    async function prepare() {
      try {
        const user = await remoteAuthentication.getAuthenticatedUser();
        if (user.clientId) setAuthenticatedUser(user);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return appIsReady ? (
    <ThemeProvider theme={currentTheme}>
      <AuthenticationProvider>
        <IntroductionProvider>
          <ToastProvider>
            <GestureHandlerRootView
              onLayout={onLayoutRootView}
              style={{ flex: 1 }}
            >
              <Router authenticatedUser={authenticatedUser} />
            </GestureHandlerRootView>
            <StatusBar style="auto" translucent />
          </ToastProvider>
        </IntroductionProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
