declare module '*.png';

// Router globals
type StackParamList = {
  Access: undefined;
  Authentication: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
