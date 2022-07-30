export type SignupIdentityProviderParams = {
  email: string;
  password: string;
  name: string;
};

export interface IdentityProvider<T> {
  signup(params: SignupIdentityProviderParams): Promise<T>;
}
