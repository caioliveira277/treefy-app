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
    rate_active: '#D56D6D',
    rate_inactive: '#E5A6A7',
    sun: '#F0DE5F',
    water: '#B0D8FE',
    edit: '#4ABCBC',
    complete: '#4ABC86',
    error: '#E04244',
    success: '#79AA05',
    warning: '#C46403',
    info: '#01A0C4',
  },
  borders: {
    border_radius_sm: '5px',
    border_radius_md: '10px',
  },
  fonts: {
    sizes: {
      xl: '18px',
      lg: '16px',
      md: '14px',
      sm: '12px',
    },
    families: {
      regular: 'RobotoSlab_400Regular',
      medium: 'RobotoSlab_500Medium',
      bold: 'RobotoSlab_700Bold',
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
