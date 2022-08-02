import { Signup, SignupParams } from '@/domain/usecases';
import { IdentityProvider } from '@/data/protocols/identity';

export class RemoteSignup implements Signup {
  private readonly identityProvider: IdentityProvider;

  constructor(identityProvider: IdentityProvider) {
    this.identityProvider = identityProvider;
  }

  public async signup(params: SignupParams): Promise<boolean> {
    const response = await this.identityProvider.signup(params);
    return response;
  }
}
