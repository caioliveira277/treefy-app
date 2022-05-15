import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { currentTheme } from '@/presentation/themes';

const WrapperComponent: React.FC = ({ children }) => (
  <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
);

export const mockRender = (
  component: React.ReactElement<any>,
  options?: RenderOptions
) => render(component, { wrapper: WrapperComponent, ...options });
