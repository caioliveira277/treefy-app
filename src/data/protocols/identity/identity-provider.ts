export type SignupIdentityProviderParams = {
  email: string;
  password: string;
  name: string;
};

export interface IdentityProvider {
  configure(): void;
  signup(params: SignupIdentityProviderParams): Promise<boolean>;
}
