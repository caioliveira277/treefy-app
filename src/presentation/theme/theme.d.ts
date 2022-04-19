import 'styled-components';

type ThemeColors = {
  primary: string;
  secondary: string;
  white: string;
  contrast: string;
  placeholder: string;
  placeholder_light: string;
  rate: string;
};

type ThemeBorders = {
  border_radius_sm: string;
  border_radius_md: string;
};

type ThemeFonts = {
  sizes: {
    title: string;
    subtitle: string;
    paragraph: string;
    small: string;
  };
  families: {
    regular: string;
    medium: string;
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
