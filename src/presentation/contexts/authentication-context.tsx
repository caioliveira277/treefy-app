import React, { ReactNode } from 'react';

interface AuthenticationProviderState {
  isAuthenticated: boolean;
}
interface AuthenticationProviderMethods {
  setIsAuthenticated(isAuthenticated: boolean): void;
}
interface AuthenticationProviderProps {
  children?: ReactNode;
}

export interface AuthenticationContextParams {
  authentication: AuthenticationProviderState & AuthenticationProviderMethods;
}

const AuthenticationContext = React.createContext<AuthenticationContextParams>(
  {} as AuthenticationContextParams
);
AuthenticationContext.displayName = 'Authentication';

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export class AuthenticationProvider
  extends React.Component<
    AuthenticationProviderProps,
    AuthenticationProviderState
  >
  implements AuthenticationProviderMethods
{
  constructor(props: AuthenticationProviderProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  public setIsAuthenticated = (isAuthenticated: boolean): void => {
    this.setState({
      isAuthenticated,
    });
  };

  public render() {
    const { isAuthenticated } = this.state;
    const { setIsAuthenticated } = this;
    return (
      <AuthenticationContext.Provider
        value={{ authentication: { isAuthenticated, setIsAuthenticated } }}
      >
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

export default AuthenticationContext;
