import { ChangeProfileViewModelImpl } from '@/presentation/view-models';
import { ChangeProfileView } from '@/presentation/views';
import { RouteProp } from '@react-navigation/native';
import { makeRemoteAuthentication } from '@/main/factories/usecases';
import { BuilderValidator, CompositeValidator } from '@/validations';

interface MakeChangeProfileViewProps {
  route: RouteProp<StackParamList, 'ChangeProfile'>;
  navigation: any;
}

export const makeChangeProfileView: React.FC<MakeChangeProfileViewProps> = (
  props
) => {
  const changeProfileViewModel = new ChangeProfileViewModelImpl(
    makeRemoteAuthentication(),
    CompositeValidator.build([
      ...BuilderValidator.field('completeName')
        .required()
        .completeName()
        .build(),
      ...BuilderValidator.field('currentPassword')
        .requiredIf('newPassword')
        .build(),
      ...BuilderValidator.field('newPassword')
        .requiredIf('currentPassword')
        .minLength(5)
        .containsLowercase()
        .containsUppercase()
        .containsNumber()
        .build(),
      ...BuilderValidator.field('confirmNewPassword')
        .requiredIf('newPassword')
        .sameAs('newPassword', 'Nova senha')
        .build(),
    ])
  );
  return (
    <ChangeProfileView
      {...props}
      changeProfileViewModel={changeProfileViewModel}
    />
  );
};
