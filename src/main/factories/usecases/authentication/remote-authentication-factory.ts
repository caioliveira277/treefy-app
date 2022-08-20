import { RemoteAuthentication } from '@/data/usecases';
import { AWSCognitoIdentityProvider } from '@/infra/aws';

export const makeRemoteAuthentication = () =>
  new RemoteAuthentication(AWSCognitoIdentityProvider);
