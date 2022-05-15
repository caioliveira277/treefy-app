type StackParamList = {
  Access: undefined;
  Authentication: undefined;
  EmailConfirmation: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
