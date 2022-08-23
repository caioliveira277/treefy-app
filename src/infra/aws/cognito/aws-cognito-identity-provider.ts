import { IdentityProvider } from '@/data/protocols/identity';
import { AccountModel } from '@/domain/models';
import {
  AuthenticationParams,
  ChangePasswordParams,
  ConfirmByCodeParms,
  SendCodeToChangePasswordParams,
  SendConfirmationCodeParams,
  SignupParams,
  UpdateUserAccountParams,
} from '@/domain/usecases';
import { Amplify, Auth } from 'aws-amplify';

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
    const {
      signInUserSession: { idToken },
    } = await Auth.signIn(params.email, params.password);
    const { payload } = idToken;

    return {
      clientId: payload['cognito:username'],
      email: payload.email,
      name: payload.name,
      accessToken: idToken?.jwtToken,
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

  public async forgotPassword(
    params: SendCodeToChangePasswordParams
  ): Promise<boolean> {
    await Auth.forgotPassword(params.email);
    return true;
  }

  public async forgotPasswordSubmit(
    params: ChangePasswordParams
  ): Promise<boolean> {
    await Auth.forgotPasswordSubmit(
      params.email,
      params.code,
      params.newPassword
    );
    return true;
  }

  public async getCurrentAuthenticatedUser(): Promise<AccountModel> {
    const account: AccountModel = {
      name: '',
      email: '',
      clientId: '',
    };

    try {
      const {
        signInUserSession: { idToken },
      } = await Auth.currentAuthenticatedUser();
      const { payload } = idToken;

      account.clientId = payload['cognito:username'];
      account.email = payload.email;
      account.name = payload.name;
      account.accessToken = idToken?.jwtToken;

      return account;
    } catch (error) {
      return account;
    }
  }

  public async signout(): Promise<boolean> {
    await Auth.signOut();
    return true;
  }

  public async updateUserAccount(
    params: UpdateUserAccountParams
  ): Promise<boolean> {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      name: params.name,
    });
    await Auth.completeNewPassword(user, params.newPassword || '');
    return true;
  }
}
export const AWSCognitoIdentityProvider = new AWSCognitoIdentityProviderClass();
