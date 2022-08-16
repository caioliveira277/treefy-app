import { render, RenderOptions } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { currentTheme } from '@/presentation/themes';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const WrapperComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;

export const mockRender = (
  component: React.ReactElement<any>,
  options?: RenderOptions
) => render(component, { wrapper: WrapperComponent, ...options });
