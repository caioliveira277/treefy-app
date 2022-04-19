export type IconeName = 'mail' | 'lock' | 'eye-open' | 'eye-close';

export const getIcon = (iconName: IconeName) => {
  switch (iconName) {
    case 'mail':
      return require('@assets/icons/mail.png');
    case 'lock':
      return require('@assets/icons/lock.png');
    case 'eye-open':
      return require('@assets/icons/eye-open.png');
    case 'eye-close':
      return require('@assets/icons/eye-close.png');
  }
};
