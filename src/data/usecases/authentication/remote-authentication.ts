import {
  Authentication,
  AuthenticationParams,
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
}
