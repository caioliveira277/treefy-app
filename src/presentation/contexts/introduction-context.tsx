import React, { PropsWithChildren } from 'react';

interface IntroductionProviderState {
  alreadyViewed: boolean;
}
interface IntroductionProviderMethods {
  setAlreadyViewed(alreadyViewed: boolean): void;
}
interface IntroductionProviderProps extends PropsWithChildren {}

export interface IntroductionContextParams {
  introduction: IntroductionProviderState & IntroductionProviderMethods;
}

const IntroductionContext = React.createContext<IntroductionContextParams>(
  {} as IntroductionContextParams
);
IntroductionContext.displayName = 'Introduction';

export const IntroductionConsumer = IntroductionContext.Consumer;

export class IntroductionProvider
  extends React.Component<IntroductionProviderProps, IntroductionProviderState>
  implements IntroductionProviderMethods
{
  constructor(props: IntroductionProviderProps) {
    super(props);

    this.state = {
      alreadyViewed: false,
    };
  }

  public setAlreadyViewed = (alreadyViewed: boolean): void => {
    this.setState({
      alreadyViewed,
    });
  };

  public render() {
    const { alreadyViewed } = this.state;
    const { setAlreadyViewed } = this;
    return (
      <IntroductionContext.Provider
        value={{ introduction: { alreadyViewed, setAlreadyViewed } }}
      >
        {this.props.children}
      </IntroductionContext.Provider>
    );
  }
}

export default IntroductionContext;
