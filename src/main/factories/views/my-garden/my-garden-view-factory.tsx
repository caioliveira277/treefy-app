import { MyGardenViewModelImpl } from '@/presentation/view-models';
import { MyGardenView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteGetUserPlants } from '@/main/factories/usecases';
import { AuthenticationConsumer } from '@/presentation/contexts';

interface MakeMyGardenViewProps {
  route: RouteProp<StackParamList, 'MyGarden'>;
  navigation: any;
}

export const makeGardenView: React.FC<MakeMyGardenViewProps> = (props) => {
  const myGardenViewModel = new MyGardenViewModelImpl(
    makeRemoteGetUserPlants()
  );
  return (
    <AuthenticationConsumer>
      {(authenticationContextParams) => (
        <MyGardenView
          contextConsumer={{ ...authenticationContextParams }}
          {...props}
          myGardenViewModel={myGardenViewModel}
        />
      )}
    </AuthenticationConsumer>
  );
};
