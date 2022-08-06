import type { NavigatorScreenParams } from '@react-navigation/native';

type PublicRoutesParamsList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
  CodeConfirmation: {
    email: string;
    password?: string;
    flow: 'Signup';
  };
};

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

declare global {
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
