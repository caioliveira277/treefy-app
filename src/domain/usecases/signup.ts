export type SignupParams = {
  email: string;
  password: string;
  name: string;
};

export type SignupSendConfirmationCodeParams = {
  email: string;
};

export type SignupConfirmByCodeParms = {
  email: string;
  code: string;
};

export interface Signup {
  signup(params: SignupParams): Promise<boolean>;
  sendConfirmationCode(
    params: SignupSendConfirmationCodeParams
  ): Promise<boolean>;
  confirmByCode(params: SignupConfirmByCodeParms): Promise<boolean>;
}
