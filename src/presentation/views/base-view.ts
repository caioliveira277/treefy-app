import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReactNode } from 'react';
export interface BaseView<Props = any> {
  onViewModelChanged(): void;
  props: Readonly<Props> &
    Readonly<{ children?: ReactNode }> &
    NativeStackScreenProps<StackParamList, keyof StackParamList>;
}
