import { AccountModel } from '@/domain/models';
import { AuthenticationParams, SignupParams } from '@/domain/usecases';

export interface IdentityProvider {
  configure(): void;
  signup(params: SignupParams): Promise<boolean>;
  signin(params: AuthenticationParams): Promise<AccountModel>;
}
