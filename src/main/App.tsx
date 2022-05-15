import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { currentTheme } from '@/presentation/theme';
import { Router } from '@/presentation/routes/router';
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from '@expo-google-fonts/roboto-slab';

function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
  });

  return fontsLoaded ? (
    <ThemeProvider theme={currentTheme}>
      <Router />
      <StatusBar style="auto" translucent />
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
