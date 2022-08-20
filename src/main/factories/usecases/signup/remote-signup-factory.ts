import { RemoteSignup } from '@/data/usecases';
import { AWSCognitoIdentityProvider } from '@/infra/aws';

export const makeRemoteSignup = () =>
  new RemoteSignup(AWSCognitoIdentityProvider);
