import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthenticationContextParams,
  IntroductionContextParams,
} from '@/presentation/contexts';
import { ToastType } from 'react-native-toast-notifications';

export interface BaseView {
  onViewModelChanged(): void;
  props: NativeStackScreenProps<StackParamList, keyof StackParamList> & {
    contextConsumer?: Partial<
      AuthenticationContextParams &
        IntroductionContextParams & { toast: ToastType }
    >;
  };
}
