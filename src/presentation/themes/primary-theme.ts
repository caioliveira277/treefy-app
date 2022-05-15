import { DefaultTheme } from 'styled-components';

export const primaryTheme: DefaultTheme = {
  colors: {
    primary: '#4ABC86',
    secondary: '#253239',
    body: '#585960',
    white: '#ffffff',
    contrast: '#FCFDFF',
    placeholder: '#C6C6C6',
    placeholder_light: '#EEEEEE',
    rate: '#D56D6D',
  },
  borders: {
    border_radius_sm: '5px',
    border_radius_md: '10px',
  },
  fonts: {
    sizes: {
      title: '18px',
      subtitle: '16px',
      paragraph: '12px',
      small: '10px',
    },
    families: {
      regular: 'RobotoSlab_400Regular',
      medium: 'RobotoSlab_500Medium',
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
};

// shadow_sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
