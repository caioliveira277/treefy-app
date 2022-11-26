import { IdentityProvider } from '@/data/protocols';
import { AccountModel } from '@/domain/models';
import {
  AuthenticationAuthParams,
  AuthenticationChangePasswordParams,
  SignupConfirmByCodeParms,
  AuthenticationSendCodeToChangePasswordParams,
  SignupSendConfirmationCodeParams,
  SignupParams,
  AuthenticationUpdateUserAccountParams,
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

  public async signin(params: AuthenticationAuthParams): Promise<AccountModel> {
    const account: AccountModel = {
      name: '',
      email: '',
      clientId: '',
      accessToken: '',
    };

    try {
      const user = await Auth.signIn(params.email, params.password);
      const { payload } = user.signInUserSession.idToken;

      account.clientId = payload['cognito:username'];
      account.email = payload.email;
      account.name = payload.name;
      account.accessToken = user.signInUserSession.idToken?.jwtToken;
    } catch (error) {
      console.log(error);
    }
    return account;
  }

  public async sendConfirmationCode(
    params: SignupSendConfirmationCodeParams
  ): Promise<boolean> {
    await Auth.resendSignUp(params.email);
    return true;
  }

  public async confirmSignup(
    params: SignupConfirmByCodeParms
  ): Promise<boolean> {
    await Auth.confirmSignUp(params.email, params.code);
    return true;
  }

  public async forgotPassword(
    params: AuthenticationSendCodeToChangePasswordParams
  ): Promise<boolean> {
    await Auth.forgotPassword(params.email);
    return true;
  }

  public async forgotPasswordSubmit(
    params: AuthenticationChangePasswordParams
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
      const user = await Auth.currentAuthenticatedUser();
      const { payload } = user.signInUserSession.idToken;

      account.clientId = payload['cognito:username'];
      account.email = payload.email;
      account.name = payload.name;
      account.accessToken = user.signInUserSession.idToken?.jwtToken;
    } catch (error) {}
    return account;
  }

  public async signout(): Promise<boolean> {
    await Auth.signOut();
    return true;
  }

  public async updateUserAccount(
    params: AuthenticationUpdateUserAccountParams
  ): Promise<boolean> {
    try {
      const { name, currentPassword, newPassword } = params;
      const user = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(user, {
        name,
      });

      if (currentPassword && newPassword) {
        Auth.changePassword(user, currentPassword, newPassword);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
export const AWSCognitoIdentityProvider = new AWSCognitoIdentityProviderClass();
