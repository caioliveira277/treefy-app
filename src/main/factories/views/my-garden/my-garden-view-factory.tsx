import { MyGardenViewModelImpl } from '@/presentation/view-models';
import { MyGardenView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import {
  makeRemoteCreateUserPlants,
  makeRemoteGetSpecies,
  makeRemoteGetUserPlants,
  makeRemoteUpdateUserPlants,
} from '@/main/factories/usecases';
import { AuthenticationConsumer, ToastConsumer } from '@/presentation/contexts';
import { BuilderValidator, CompositeValidator } from '@/validations';

interface MakeMyGardenViewProps {
  route: RouteProp<StackParamList, 'MyGarden'>;
  navigation: any;
}

export const makeGardenView: React.FC<MakeMyGardenViewProps> = (props) => {
  const myGardenViewModel = new MyGardenViewModelImpl(
    makeRemoteGetUserPlants(),
    makeRemoteGetSpecies(),
    makeRemoteCreateUserPlants(),
    makeRemoteUpdateUserPlants(),
    CompositeValidator.build([
      ...BuilderValidator.field('name').required().build(),
      ...BuilderValidator.field('sunTimes').requiredIf('sunRange').build(),
      ...BuilderValidator.field('sunRange').requiredIf('sunTimes').build(),
      ...BuilderValidator.field('waterTimes').requiredIf('waterRange').build(),
      ...BuilderValidator.field('waterRange').requiredIf('waterTimes').build(),
    ])
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
