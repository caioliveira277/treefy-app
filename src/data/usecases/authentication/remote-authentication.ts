import {
  Authentication,
  AuthenticationAuthParams,
  AuthenticationChangePasswordParams,
  AuthenticationSendCodeToChangePasswordParams,
  AuthenticationUpdateUserAccountParams,
} from '@/domain/usecases/authentication';
import { IdentityProvider } from '@/data/protocols';
import { AccountModel } from '@/domain/models';

export class RemoteAuthentication implements Authentication {
  private readonly identityProvider: IdentityProvider;

  constructor(identityProvider: IdentityProvider) {
    this.identityProvider = identityProvider;
  }

  public async auth(params: AuthenticationAuthParams): Promise<AccountModel> {
    const response = await this.identityProvider.signin(params);
    return response;
  }

  public async sendCodeToChangePassword(
    params: AuthenticationSendCodeToChangePasswordParams
  ): Promise<boolean> {
    const response = await this.identityProvider.forgotPassword(params);
    return response;
  }

  public async changePassword(
    params: AuthenticationChangePasswordParams
  ): Promise<boolean> {
    const response = await this.identityProvider.forgotPasswordSubmit(params);
    return response;
  }

  public async getAuthenticatedUser(): Promise<AccountModel> {
    const response = await this.identityProvider.getCurrentAuthenticatedUser();
    return response;
  }

  public async loggout(): Promise<boolean> {
    const response = await this.identityProvider.signout();
    return response;
  }

  public async updateAccount(
    params: AuthenticationUpdateUserAccountParams
  ): Promise<boolean> {
    const response = await this.identityProvider.updateUserAccount(params);
    return response;
  }
}
