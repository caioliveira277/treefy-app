import { MyGardenViewModelImpl } from '@/presentation/view-models';
import { MyGardenView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteCreateUserPlants,
  makeRemoteGetUserPlants,
} from '@/main/factories/usecases';
import { AuthenticationConsumer, ToastConsumer } from '@/presentation/contexts';

interface MakeMyGardenViewProps {
  route: RouteProp<StackParamList, 'MyGarden'>;
  navigation: any;
}

export const makeGardenView: React.FC<MakeMyGardenViewProps> = (props) => {
  const myGardenViewModel = new MyGardenViewModelImpl(
    makeRemoteGetUserPlants(),
    makeRemoteCreateUserPlants()
  );
  return (
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <ToastConsumer>
          {(toastContextParams) => (
            <MyGardenView
              contextConsumer={{
                ...authenticationContextParams,
                ...toastContextParams,
              }}
              {...props}
              myGardenViewModel={myGardenViewModel}
            />
          )}
        </ToastConsumer>
      )}
    </AuthenticationConsumer>
  );
};
