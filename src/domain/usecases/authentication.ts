import { AccountModel } from '@/domain/models/account-model';

export type AuthenticationAuthParams = {
  email: string;
  password: string;
};

export type AuthenticationSendCodeToChangePasswordParams = {
  email: string;
};

export type AuthenticationChangePasswordParams = {
  email: string;
  newPassword: string;
  code: string;
};

export type AuthenticationUpdateUserAccountParams = {
  name: string;
  currentPassword?: string;
  newPassword?: string;
};

export interface Authentication {
  auth(params: AuthenticationAuthParams): Promise<AccountModel>;
  sendCodeToChangePassword(
    params: AuthenticationSendCodeToChangePasswordParams
  ): Promise<boolean>;
  changePassword(params: AuthenticationChangePasswordParams): Promise<boolean>;
  getAuthenticatedUser(): Promise<AccountModel>;
  updateAccount(
    params: AuthenticationUpdateUserAccountParams
  ): Promise<boolean>;
  loggout(): Promise<boolean>;
}
