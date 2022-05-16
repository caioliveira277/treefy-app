type StackParamList = {
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
  ChangePassword: undefined;
  Signup: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
