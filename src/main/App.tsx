import { ThemeProvider } from 'styled-components';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { primaryTheme } from '@/presentation/theme';

function App() {
  return (
    <ThemeProvider theme={primaryTheme}>
      <View>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

export default registerRootComponent(App);
