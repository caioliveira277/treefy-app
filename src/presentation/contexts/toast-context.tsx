import React, { ReactNode } from 'react';
import { ToastProvider as Provider } from 'react-native-toast-notifications';
import ToastContext from 'react-native-toast-notifications/src/hook/context';
import {
  ToastMessageComponent,
  ToastMessageComponentProps,
} from '@/presentation/components';
import { ToastProps } from 'react-native-toast-notifications/src/toast';

interface ToastProviderState {}
interface ToastProviderMethods {
  renderToastElement: (toast: ToastProps) => JSX.Element;
}
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

  public renderToastElement(toast: ToastProps) {
    return (
      <ToastMessageComponent
        type={toast.type as ToastMessageComponentProps['type']}
        title={String(toast.message)}
        message={toast.data.message}
      />
    );
  }

  public render() {
    return (
      <Provider
        placement="top"
        offsetTop={40}
        swipeEnabled
        animationDuration={200}
        renderToast={this.renderToastElement}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default ToastContext;
