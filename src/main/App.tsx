import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { primaryTheme } from '@/presentation/theme';
import { AuthenticationView } from '@/presentation/views';
import { AuthenticationViewModelImpl } from '@/presentation/view-models';
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
  const authenticationViewModel = new AuthenticationViewModelImpl();

  return fontsLoaded ? (
    <ThemeProvider theme={primaryTheme}>
      <AuthenticationView authenticationViewModel={authenticationViewModel} />
      <StatusBar style="auto" translucent />
    </ThemeProvider>
  ) : null;
}

export default registerRootComponent(App);
