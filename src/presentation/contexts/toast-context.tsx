import React from 'react';
import {
  ToastProvider as Provider,
  ToastType,
} from 'react-native-toast-notifications';
import {
  ToastMessageComponent,
  ToastMessageComponentProps,
} from '@/presentation/components';
import ToastContext from 'react-native-toast-notifications/src/hook/context';
import { ToastProps } from 'react-native-toast-notifications/src/toast';

type CustomToast = {
  showCustom: (
    title: string,
    message: string,
    type: ToastMessageComponentProps['type']
  ) => void;
} & ToastType;
export interface ToastContextParams {
  toast: CustomToast;
}
export const ToastConsumer: React.FC<{
  children: (toastContextParams: ToastContextParams) => React.ReactNode;
}> = ({ children }) => {
  const override = (toastType: ToastType): ToastContextParams => {
    const showCustom: CustomToast['showCustom'] = (title, message, type) => {
      toastType.hideAll();
      setTimeout(() => {
        toastType.show(title, {
          type,
          data: {
            message,
          },
        });
      }, 600);
    };

    return { toast: { ...toastType, showCustom } };
  };
  return (
    <ToastContext.Consumer>
      {(toastType) => children(override(toastType))}
    </ToastContext.Consumer>
  );
};

export class ToastProvider extends React.Component {
  private renderToastElement(toast: ToastProps) {
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
