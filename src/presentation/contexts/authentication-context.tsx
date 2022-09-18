import { AccountModel } from '@/domain/models';
import React, { ReactNode } from 'react';

interface AuthenticationProviderState {
  isAuthenticated: boolean;
  authenticatedUser: AccountModel;
}
interface AuthenticationProviderMethods {
  setAuthenticatedUser(user: AccountModel): void;
  loggoutUser(): void;
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
      authenticatedUser: {} as AccountModel,
    };
  }

  public setAuthenticatedUser = (user: AccountModel): void => {
    this.setState({
      authenticatedUser: user,
      isAuthenticated: !!user.clientId,
    });
  };

  public loggoutUser = () => {
    this.setState({
      authenticatedUser: {} as AccountModel,
      isAuthenticated: false,
    });
  };

  public render() {
    const { isAuthenticated, authenticatedUser } = this.state;
    const { setAuthenticatedUser, loggoutUser } = this;
    return (
      <AuthenticationContext.Provider
        value={{
          authentication: {
            loggoutUser,
            isAuthenticated,
            authenticatedUser,
            setAuthenticatedUser,
          },
        }}
      >
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

export default AuthenticationContext;
