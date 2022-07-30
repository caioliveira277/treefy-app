import {
  IdentityProvider,
  SignupIdentityProviderParams,
} from '@/data/protocols/identity';
import { Amplify, Auth } from 'aws-amplify';

class AWSCognitoIdentityProviderClass implements IdentityProvider {
  configure(): void {
    Amplify.configure({
      mandatorySignIn: true,
      region: process.env.REGION,
      userPoolId: process.env.USERPOOLID,
      identityPoolId: process.env.IDENTITYPOOLID,
      userPoolWebClientId: process.env.USERPOOLWEBCLIENTID,
    });
  }

  async signup(params: SignupIdentityProviderParams): Promise<boolean> {
    try {
      await Auth.signUp({
        username: params.email,
        password: params.password,
        attributes: {
          name: params.name,
        },
      });
      return true;
    } catch (_error) {
      return false;
    }
  }
}
export const AWSCognitoIdentityProvider = new AWSCognitoIdentityProviderClass();
