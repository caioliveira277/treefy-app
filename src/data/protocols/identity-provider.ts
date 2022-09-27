import { AccountModel } from '@/domain/models';
import {
  AuthenticationAuthParams,
  AuthenticationChangePasswordParams,
  SignupConfirmByCodeParms,
  AuthenticationSendCodeToChangePasswordParams,
  SignupSendConfirmationCodeParams,
  SignupParams,
  AuthenticationUpdateUserAccountParams,
} from '@/domain/usecases';

export interface IdentityProvider {
  configure(): void;
  signup(params: SignupParams): Promise<boolean>;
  signin(params: AuthenticationAuthParams): Promise<AccountModel>;
  confirmSignup(params: SignupConfirmByCodeParms): Promise<boolean>;
  sendConfirmationCode(
    params: SignupSendConfirmationCodeParams
  ): Promise<boolean>;
  forgotPassword(
    params: AuthenticationSendCodeToChangePasswordParams
  ): Promise<boolean>;
  forgotPasswordSubmit(
    params: AuthenticationChangePasswordParams
  ): Promise<boolean>;
  getCurrentAuthenticatedUser(): Promise<AccountModel>;
  updateUserAccount(
    params: AuthenticationUpdateUserAccountParams
  ): Promise<boolean>;
  signout(): Promise<boolean>;
}
