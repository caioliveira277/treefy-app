import React, { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IntroductionProviderState {
  alreadyViewed: boolean;
}
interface IntroductionProviderMethods {
  setAlreadyViewed(alreadyViewed: boolean): void;
  setAlreadyViewedByStorage(): Promise<void>;
}
interface IntroductionProviderProps {
  children?: ReactNode;
}

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
  private readonly storageKey = 'introductionViewed';

  private readonly storageValue = 'viewed';

  constructor(props: IntroductionProviderProps) {
    super(props);

    this.state = {
      alreadyViewed: true,
    };
  }

  public setAlreadyViewedByStorage = async () => {
    const result = await AsyncStorage.getItem(this.storageKey);
    this.setState({ alreadyViewed: result === this.storageValue });
  };

  public setAlreadyViewed = (alreadyViewed: boolean): void => {
    AsyncStorage.setItem(this.storageKey, this.storageValue).finally(() => {
      this.setState({
        alreadyViewed,
      });
    });
  };

  public render() {
    const { alreadyViewed } = this.state;
    const { setAlreadyViewed, setAlreadyViewedByStorage } = this;
    return (
      <IntroductionContext.Provider
        value={{
          introduction: {
            alreadyViewed,
            setAlreadyViewed,
            setAlreadyViewedByStorage,
          },
        }}
      >
        {this.props.children}
      </IntroductionContext.Provider>
    );
  }
}

export default IntroductionContext;
