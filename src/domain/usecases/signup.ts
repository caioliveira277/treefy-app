export type SignupParams = {
  email: string;
  password: string;
  name: string;
};

export type SendConfirmationCodeParams = {
  email: string;
};

export type ConfirmByCodeParms = {
  email: string;
  code: string;
};

export interface Signup {
  signup(params: SignupParams): Promise<boolean>;
  sendConfirmationCode(params: SendConfirmationCodeParams): Promise<boolean>;
  confirmByCode(params: ConfirmByCodeParms): Promise<boolean>;
}
