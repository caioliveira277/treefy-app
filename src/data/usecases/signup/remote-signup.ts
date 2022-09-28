import {
  SignupConfirmByCodeParms,
  SignupSendConfirmationCodeParams,
  Signup,
  SignupParams,
} from '@/domain/usecases';
import { IdentityProvider } from '@/data/protocols';

export class RemoteSignup implements Signup {
  private readonly identityProvider: IdentityProvider;

  constructor(identityProvider: IdentityProvider) {
    this.identityProvider = identityProvider;
  }

  public async signup(params: SignupParams): Promise<boolean> {
    const response = await this.identityProvider.signup(params);
    return response;
  }

  public async sendConfirmationCode(
    params: SignupSendConfirmationCodeParams
  ): Promise<boolean> {
    const response = await this.identityProvider.sendConfirmationCode(params);
    return response;
  }

  public async confirmByCode(
    params: SignupConfirmByCodeParms
  ): Promise<boolean> {
    const response = await this.identityProvider.confirmSignup(params);
    return response;
  }
}
