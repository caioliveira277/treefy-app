import { Signup, SignupParams } from '@/domain/usecases/signup';
import { IdentityProvider } from '@/data/protocols/identity-provider';
import { AccountModel } from '@/domain/models';

export class RemoteSignup implements Signup {
  private readonly identityProvider: IdentityProvider<AccountModel>;

  constructor(identityProvider: IdentityProvider<AccountModel>) {
    this.identityProvider = identityProvider;
  }

  public async signup(parms: SignupParams): Promise<AccountModel> {
    const response = await this.identityProvider.signup(parms);
    return response;
  }
}
