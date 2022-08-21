import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { currentTheme } from '@/presentation/themes';
import { Router } from '@/main/routes/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AWSCognitoIdentityProvider } from '@/infra/aws';
import { AuthenticationProvider } from '@/presentation/contexts';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';

AWSCognitoIdentityProvider.configure();

function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  return fontsLoaded ? (
    <ThemeProvider theme={currentTheme}>
      <AuthenticationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Router />
        </GestureHandlerRootView>
        <StatusBar style="auto" translucent />
      </AuthenticationProvider>
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
