export const getProfile = (name: string) => {
  let key = 1;
  let i = 0;
  let reverse = false;

  while (i < name.length) {
    if (key === 1) reverse = false;
    if (key === 5) reverse = true;

    if (reverse) key--;
    else key++;

    i++;
  }

  switch (key) {
    case 1:
      return require('@assets/images/profiles/profile-1.png');
    case 2:
      return require('@assets/images/profiles/profile-2.png');
    case 3:
      return require('@assets/images/profiles/profile-3.png');
    case 4:
      return require('@assets/images/profiles/profile-4.png');
    case 5:
      return require('@assets/images/profiles/profile-5.png');
  }
};
