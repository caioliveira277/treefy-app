import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthenticationContextParams,
  ToastContextParams,
  IntroductionContextParams,
} from '@/presentation/contexts';

export interface BaseView {
  onViewModelChanged(): void;
  props: NativeStackScreenProps<StackParamList, keyof StackParamList> & {
    contextConsumer?: Partial<
      AuthenticationContextParams &
        IntroductionContextParams &
        ToastContextParams
    >;
  };
}
