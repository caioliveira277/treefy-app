import { AccountModel } from '@/domain/models';
import {
  AuthenticationParams,
  ChangePasswordParams,
  ConfirmByCodeParms,
  SendCodeToChangePasswordParams,
  SendConfirmationCodeParams,
  SignupParams,
} from '@/domain/usecases';

export interface IdentityProvider {
  configure(): void;
  signup(params: SignupParams): Promise<boolean>;
  signin(params: AuthenticationParams): Promise<AccountModel>;
  confirmSignup(params: ConfirmByCodeParms): Promise<boolean>;
  sendConfirmationCode(params: SendConfirmationCodeParams): Promise<boolean>;
  forgotPassword(params: SendCodeToChangePasswordParams): Promise<boolean>;
  forgotPasswordSubmit(params: ChangePasswordParams): Promise<boolean>;
}
