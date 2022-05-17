type StackParamList = {
  Introduction: undefined;
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
  Home: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
