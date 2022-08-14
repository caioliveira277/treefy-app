import React from 'react';
import { ButtonComponent, TextInputComponent } from '@/presentation/components';
import { PublicLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { spacing } from './styles';
import { ChangePasswordViewModel } from '@/presentation/view-models';

export interface ChangePasswordViewProps
  extends NativeStackScreenProps<StackParamList, 'ChangePassword'> {
  changePasswordViewModel: ChangePasswordViewModel;
}

export interface ChangePasswordViewState {
  form: {
    password: string;
    confirmPassword: string;
  };
  formErrors: {
    password: string;
    confirmPassword: string;
  };
}

export class ChangePasswordView
  extends React.Component<ChangePasswordViewProps, ChangePasswordViewState>
  implements BaseView<ChangePasswordViewProps>
{
  private changePasswordViewModel: ChangePasswordViewModel;

  constructor(props: ChangePasswordViewProps) {
    super(props);

    const { changePasswordViewModel } = this.props;
    this.changePasswordViewModel = changePasswordViewModel;

    this.state = {
      form: changePasswordViewModel.form,
      formErrors: changePasswordViewModel.formErrors,
    };
  }

  public componentDidMount(): void {
    this.changePasswordViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.changePasswordViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      form: this.changePasswordViewModel.form,
      formErrors: this.changePasswordViewModel.form,
    });
  }

  render() {
    const { password, confirmPassword } = this.state.form;
    const { password: passwordError, confirmPassword: confirmPasswordError } =
      this.state.formErrors;
    return (
      <PublicLayout title="Redefina sua senha">
        <TextInputComponent
          style={spacing.input}
          iconName="lock"
          type="password"
          label="Senha:"
          placeholderText="Senha secreta"
          value={password}
          errorMessage={passwordError}
          onChangeText={(text) =>
            this.changePasswordViewModel.handlePasswordInputChange(text)
          }
        />
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a senha:"
          placeholderText="Senha secreta"
          value={confirmPassword}
          errorMessage={confirmPasswordError}
          onChangeText={(text) =>
            this.changePasswordViewModel.handleConfirmPasswordInputChange(text)
          }
        />
        <ButtonComponent
          onPress={() => this.changePasswordViewModel.handleSubmit()}
          style={spacing.button}
        >
          Redefinir
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
