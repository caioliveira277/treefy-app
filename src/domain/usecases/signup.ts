import { AccountModel } from '@/domain/models/account-model';

export type SignupParams = {
  email: string;
  password: string;
  name: string;
};

export interface Signup {
  signup(parms: SignupParams): Promise<AccountModel>;
}
