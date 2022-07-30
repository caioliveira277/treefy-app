import { Signup, SignupParams } from '@/domain/usecases/signup';
import { IdentityProvider } from '@/data/protocols/identity';

export class RemoteSignup implements Signup {
  private readonly identityProvider: IdentityProvider;

  constructor(identityProvider: IdentityProvider) {
    this.identityProvider = identityProvider;
  }

  public async signup(parms: SignupParams): Promise<boolean> {
    const response = await this.identityProvider.signup(parms);
    return response;
  }
}
