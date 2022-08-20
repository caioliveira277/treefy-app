import { AccountModel } from '@/domain/models/account-model';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export type SendCodeToChangePasswordParams = {
  email: string;
};

export type ChangePasswordParams = {
  email: string;
  newPassword: string;
  code: string;
};

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>;
  sendCodeToChangePassword(
    params: SendCodeToChangePasswordParams
  ): Promise<boolean>;
  changePassword(params: ChangePasswordParams): Promise<boolean>;
  getAuthenticatedUser(): Promise<AccountModel>;
}
