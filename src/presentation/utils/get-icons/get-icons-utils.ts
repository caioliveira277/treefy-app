export type IconName =
  | 'user'
  | 'mail'
  | 'lock'
  | 'eye-open'
  | 'eye-close'
  | 'search';

export const getIcon = (iconName: IconName) => {
  switch (iconName) {
    case 'user':
      return require('@assets/icons/user.png');
    case 'mail':
      return require('@assets/icons/mail.png');
    case 'lock':
      return require('@assets/icons/lock.png');
    case 'eye-open':
      return require('@assets/icons/eye-open.png');
    case 'eye-close':
      return require('@assets/icons/eye-close.png');
    case 'search':
      return require('@assets/icons/search.png');
  }
};
