import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface BaseView {
  onViewModelChanged(): void;
  props: NativeStackScreenProps<StackParamList, keyof StackParamList>;
}
