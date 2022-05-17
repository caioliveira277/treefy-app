type PublicRoutesParamsList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
};

type MainRoutesParamsList = {
  Home: undefined;
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
