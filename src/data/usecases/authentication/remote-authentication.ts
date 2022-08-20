import {
  Authentication,
  AuthenticationParams,
  ChangePasswordParams,
  SendCodeToChangePasswordParams,
} from '@/domain/usecases/authentication';
import { IdentityProvider } from '@/data/protocols/identity';
import { AccountModel } from '@/domain/models';

export class RemoteAuthentication implements Authentication {
  private readonly identityProvider: IdentityProvider;

  constructor(identityProvider: IdentityProvider) {
    this.identityProvider = identityProvider;
  }

  public async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.identityProvider.signin(params);
    return response;
  }

  public async sendCodeToChangePassword(
    params: SendCodeToChangePasswordParams
  ): Promise<boolean> {
    const response = await this.identityProvider.forgotPassword(params);
    return response;
  }

  public async changePassword(params: ChangePasswordParams): Promise<boolean> {
    const response = await this.identityProvider.forgotPasswordSubmit(params);
    return response;
  }

  public async getAuthenticatedUser(): Promise<AccountModel> {
    const response = await this.identityProvider.getCurrentAuthenticatedUser();
    return response;
  }
}
