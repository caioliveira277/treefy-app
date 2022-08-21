import type { NavigatorScreenParams } from '@react-navigation/native';

type PublicRoutesParamsList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: {
    email: string;
    code: string;
  };
  Signup: undefined;
  CodeConfirmation: {
    email: string;
    password?: string;
    flow: 'Signup' | 'ForgotPassword';
  };
};

declare global {
  type MainSubRoutes = {
    ChangeProfile: undefined;
    Profile: undefined;
    Help: undefined;
    TermsUse: undefined;
    Home: undefined;
    Article: undefined;
  };
  type MainRoutesParamsList = MainSubRoutes & {
    ProfileGroup: MainSubRoutes;
    Profile: undefined;
    HomeGroup: MainSubRoutes;
    Home: undefined;
    MyGardenGroup: undefined;
    MyGarden: undefined;
  };
  type StackParamList = PublicRoutesParamsList &
    MainRoutesParamsList & {
      Public: NavigatorScreenParams<PublicRoutesParamsList>;
      Main: {
        screen: keyof MainRoutesParamsList;
        params?: { screen: keyof MainSubRoutes };
      };
    };
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
