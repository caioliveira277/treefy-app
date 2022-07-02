import 'styled-components';

type ThemeColors = {
  primary: string;
  secondary: string;
  body: string;
  white: string;
  contrast: string;
  placeholder: string;
  placeholder_light: string;
  rate_active: string;
  rate_inactive: string;
  water: string;
  sun: string;
  edit: string;
  complete: string;
};

type ThemeBorders = {
  border_radius_sm: string;
  border_radius_md: string;
};

type ThemeFonts = {
  sizes: {
    xl: string;
    lg: string;
    md: string;
    sm: string;
  };
  families: {
    regular: string;
    medium: string;
    bold: string;
  };
};

type NativeShadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};
type ThemeShaows = {
  sm: NativeShadow;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    borders: ThemeBorders;
    fonts: ThemeFonts;
    shadows: ThemeShaows;
  }
}
