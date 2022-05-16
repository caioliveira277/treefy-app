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
  passwordValue: string;
  confirmPasswordValue: string;
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
      passwordValue: changePasswordViewModel.passwordValue,
      confirmPasswordValue: changePasswordViewModel.confirmPasswordValue,
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
      passwordValue: this.changePasswordViewModel.passwordValue,
      confirmPasswordValue: this.changePasswordViewModel.confirmPasswordValue,
    });
  }

  render() {
    const { passwordValue, confirmPasswordValue } = this.state;
    return (
      <PublicLayout title="Redefina sua senha">
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Senha:"
          placeholderText="Senha secreta"
          value={passwordValue}
          onChangeText={(text) =>
            this.changePasswordViewModel.handlePasswordInputChange(text)
          }
          style={spacing.input}
        />
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a senha:"
          placeholderText="Senha secreta"
          value={confirmPasswordValue}
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
