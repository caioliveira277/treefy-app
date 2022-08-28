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
} from '@/presentation/contexts';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';

AWSCognitoIdentityProvider.configure();
SplashScreen.preventAutoHideAsync();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const remoteAuthentication = makeRemoteAuthentication();
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    async function prepare() {
      try {
        const user = await remoteAuthentication.getAuthenticatedUser();
        if (user.clientId) setIsAuthenticated(true);
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
          <GestureHandlerRootView
            onLayout={onLayoutRootView}
            style={{ flex: 1 }}
          >
            <Router isAuthenticated={isAuthenticated} />
          </GestureHandlerRootView>
          <StatusBar style="auto" translucent />
        </IntroductionProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
