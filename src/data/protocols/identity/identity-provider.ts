import { AccountModel } from '@/domain/models';
import {
  AuthenticationParams,
  ConfirmByCodeParms,
  SendConfirmationCodeParams,
  SignupParams,
} from '@/domain/usecases';

export interface IdentityProvider {
  configure(): void;
  signup(params: SignupParams): Promise<boolean>;
  signin(params: AuthenticationParams): Promise<AccountModel>;
  confirmSignup(params: ConfirmByCodeParms): Promise<boolean>;
  sendConfirmationCode(params: SendConfirmationCodeParams): Promise<boolean>;
}
