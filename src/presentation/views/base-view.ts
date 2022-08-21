import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticationContextParams } from '@/presentation/contexts';

export interface BaseView {
  onViewModelChanged(): void;
  props: NativeStackScreenProps<StackParamList, keyof StackParamList> & {
    contextConsumer?: AuthenticationContextParams;
  };
}
