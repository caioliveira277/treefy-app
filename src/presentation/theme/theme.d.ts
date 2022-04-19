import 'styled-components';

interface ThemeColors {
  primary: string;
  secondary: string;
  white: string;
  contrast: string;
  placeholder: string;
  placeholder_light: string;
  rate: string;
  shadow_sm: string;
  border_radius_sm: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
