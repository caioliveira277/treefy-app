import { ProfileViewModel } from './profile-view-model';
import { BaseViewModelImpl } from '../base-view-model-impl';
import { Alert } from 'react-native';

export class ProfileViewModelImpl
  extends BaseViewModelImpl
  implements ProfileViewModel
{
  public completeName: string;

  public viewedArticles: number;

  public countFeedback: number;

  constructor() {
    super();
    this.completeName = '';
    this.viewedArticles = 0;
    this.countFeedback = 0;
  }

  public handleNavigation(routeName: keyof MainSubRoutes): void {
    this.baseView?.props.navigation.navigate('Main', {
      screen: 'ProfileGroup',
      params: {
        screen: routeName,
      },
    });
  }

  public handleLoggout(): void {
    Alert.alert('Loggout!');
    this.baseView?.props.navigation.navigate('Public', { screen: 'Access' });
  }
}
