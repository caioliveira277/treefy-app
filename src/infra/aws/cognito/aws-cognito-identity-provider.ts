import { IdentityProvider } from '@/data/protocols/identity';
import { AccountModel } from '@/domain/models';
import {
  AuthenticationParams,
  ConfirmByCodeParms,
  SendConfirmationCodeParams,
  SignupParams,
} from '@/domain/usecases';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

class AWSCognitoIdentityProviderClass implements IdentityProvider {
  public configure(): void {
    Amplify.configure({
      mandatorySignIn: true,
      region: process.env.REGION,
      userPoolId: process.env.USERPOOLID,
      identityPoolId: process.env.IDENTITYPOOLID,
      userPoolWebClientId: process.env.USERPOOLWEBCLIENTID,
    });
  }

  public async signup(params: SignupParams): Promise<boolean> {
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

  public async signin(params: AuthenticationParams): Promise<AccountModel> {
    const auth = (await Auth.signIn(
      params.email,
      params.password
    )) as CognitoUser;
    const currentUser = auth.getSignInUserSession()?.getIdToken().payload;

    return {
      clientId: currentUser!['cognito:username'],
      email: currentUser?.email,
      name: currentUser?.name,
      accessToken: auth.getSignInUserSession()?.getAccessToken().getJwtToken(),
    };
  }

  public async sendConfirmationCode(
    params: SendConfirmationCodeParams
  ): Promise<boolean> {
    await Auth.resendSignUp(params.email);
    return true;
  }

  public async confirmSignup(params: ConfirmByCodeParms): Promise<boolean> {
    await Auth.confirmSignUp(params.email, params.code);
    return true;
  }
}
export const AWSCognitoIdentityProvider = new AWSCognitoIdentityProviderClass();
