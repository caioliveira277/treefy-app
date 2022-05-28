type PublicRoutesParamsList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
};

type MainRoutesParamsList = {
  Profile: undefined;
  Home: undefined;
  MyGarden: undefined;
  Profile: undefined;
  ChangeProfile: undefined;
};

type StackParamList = PublicRoutesParamsList &
  MainRoutesParamsList & {
    Public: { screen: keyof PublicRoutesParamsList };
    Main: { screen: keyof MainRoutesParamsList };
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
