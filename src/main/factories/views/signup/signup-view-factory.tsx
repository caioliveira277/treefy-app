import { SignupViewModelImpl } from '@/presentation/view-models';
import { SignupView } from '@/presentation/views';
import { BuilderValidator, CompositeValidator } from '@/validations';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteSignup } from '@/main/factories/usecases';
import { ToastConsumer } from '@/presentation/contexts';

interface MakeSignupViewProps {
  route: RouteProp<StackParamList, 'Signup'>;
  navigation: any;
}

export const makeSignupView: React.FC<MakeSignupViewProps> = (props) => {
  const signupViewModel = new SignupViewModelImpl(
    makeRemoteSignup(),
    CompositeValidator.build([
      ...BuilderValidator.field('completeName')
        .required()
        .completeName()
        .build(),
      ...BuilderValidator.field('email').required().email().build(),
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
        <SignupView
          {...props}
          contextConsumer={{ ...toastContextParams }}
          signupViewModel={signupViewModel}
        />
      )}
    </ToastConsumer>
  );
};
