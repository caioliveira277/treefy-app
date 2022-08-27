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
    } catch (error) {}
    return account;
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
    params: UpdateUserAccountParams
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
