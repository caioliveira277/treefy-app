import React, { ReactNode } from 'react';
import { ToastProvider as Provider } from 'react-native-toast-notifications';
import ToastContext from 'react-native-toast-notifications/src/hook/context';

interface ToastProviderState {}
interface ToastProviderMethods {}
interface ToastProviderProps {
  children?: ReactNode;
}

export const ToastConsumer = ToastContext.Consumer;

export class ToastProvider
  extends React.Component<ToastProviderProps, ToastProviderState>
  implements ToastProviderMethods
{
  constructor(props: ToastProviderProps) {
    super(props);

    this.state = {
      alreadyViewed: true,
    };
  }

  public render() {
    return <Provider>{this.props.children}</Provider>;
  }
}

export default ToastContext;
