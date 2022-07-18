import 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { currentTheme } from '@/presentation/themes';
import { Router } from '@/presentation/routes/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AWSCognito } from '@/infra/aws/cognito/aws-cognito';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from '@expo-google-fonts/roboto-slab';

new AWSCognito().configure();

function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,
  });

  return fontsLoaded ? (
    <ThemeProvider theme={currentTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Router />
      </GestureHandlerRootView>
      <StatusBar style="auto" translucent />
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
