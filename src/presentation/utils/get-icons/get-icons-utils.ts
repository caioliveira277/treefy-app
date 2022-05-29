export type IconName =
  | 'user'
  | 'mail'
  | 'lock'
  | 'eye-open'
  | 'eye-close'
  | 'search'
  | 'rate'
  | 'calendar'
  | 'arrow-right'
  | 'edit'
  | 'headset'
  | 'tel';

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
    case 'rate':
      return require('@assets/icons/rate.png');
    case 'calendar':
      return require('@assets/icons/calendar.png');
    case 'arrow-right':
      return require('@assets/icons/arrow-right.png');
    case 'edit':
      return require('@assets/icons/edit.png');
    case 'headset':
      return require('@assets/icons/headset.png');
    case 'tel':
      return require('@assets/icons/tel.png');
  }
};
