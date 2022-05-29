type PublicRoutesParamsList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
};

type MainSubRoutes = {
  ChangeProfile: undefined;
  Profile: undefined;
  Help: undefined;
  TermsUse: undefined;
};
type MainRoutesParamsList = MainSubRoutes & {
  ProfileGroup: MainSubRoutes;
  Home: undefined;
  MyGarden: undefined;
  Profile: undefined;
};

type StackParamList = PublicRoutesParamsList &
  MainRoutesParamsList & {
    Public: { screen: keyof PublicRoutesParamsList };
    Main: {
      screen: keyof MainRoutesParamsList;
      params?: { screen: keyof MainSubRoutes };
    };
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
