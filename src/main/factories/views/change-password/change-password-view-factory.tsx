import { ChangePasswordViewModelImpl } from '@/presentation/view-models';
import { ChangePasswordView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { ToastConsumer } from '@/presentation/contexts';

interface MakeChangePasswordViewProps {
  route: RouteProp<StackParamList, 'ChangePassword'>;
  navigation: any;
}

export const makeChangePasswordView: React.FC<MakeChangePasswordViewProps> = (
  props
) => {
  const changePasswordViewModel = new ChangePasswordViewModelImpl(
    makeRemoteAuthentication(),
    CompositeValidator.build([
      ...BuilderValidator.field('password')
        .required()
        .minLength(5)
        .containsLowercase()
        .containsUppercase()
        .containsNumber()
        .build(),
      ...BuilderValidator.field('confirmPassword')
        .required()
        .sameAs('password', 'Senha')
        .build(),
    ])
  );
  return (
    <ToastConsumer>
      {(toastContextParams) => (
        <ChangePasswordView
          {...props}
          contextConsumer={{ ...toastContextParams }}
          changePasswordViewModel={changePasswordViewModel}
        />
      )}
    </ToastConsumer>
  );
};
