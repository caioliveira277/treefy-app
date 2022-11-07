import React from 'react';
import {
  ButtonComponent,
  TextInputComponent,
  LegendComponent,
} from '@/presentation/components';
import { ProfileLayout } from '@/presentation/layouts';
import { ChangeProfileViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing } from './styles';
import { BaseView } from '../base-view';
import { getProfile } from '@/presentation/utils';

export interface ChangeProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'ChangeProfile'> {
  changeProfileViewModel: ChangeProfileViewModel;
  contextConsumer: BaseView['props']['contextConsumer'];
}

export interface ChangeProfileViewState {
  form: {
    completeName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  formErrors: this['form'];
  isLoading: boolean;
}

export class ChangeProfileView
  extends React.Component<ChangeProfileViewProps, ChangeProfileViewState>
  implements BaseView
{
  private changeProfileViewModel: ChangeProfileViewModel;

  constructor(props: ChangeProfileViewProps) {
    super(props);

    const { changeProfileViewModel } = props;
    this.changeProfileViewModel = changeProfileViewModel;

    this.state = {
      form: changeProfileViewModel.form,
      formErrors: changeProfileViewModel.formErrors,
      isLoading: changeProfileViewModel.isLoading,
    };
  }

  public componentDidMount(): void {
    this.changeProfileViewModel.attachView(this);
    this.changeProfileViewModel.handleGetUserData();
  }

  public componentWillUnmount(): void {
    this.changeProfileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      form: this.changeProfileViewModel.form,
      formErrors: this.changeProfileViewModel.formErrors,
      isLoading: this.changeProfileViewModel.isLoading,
    });
  }

  render() {
    const {
      form: {
        completeName,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword,
      },
      formErrors: {
        completeName: completeNameError,
        currentPassword: currentPasswordError,
        newPassword: newPasswordError,
        confirmNewPassword: confirmNewPasswordError,
      },
      isLoading,
    } = this.state;
    return (
      <ProfileLayout
        title="Alterar informações"
        image={getProfile(completeName)}
        imageRounded
        isLoading={isLoading}
      >
        <LegendComponent>Seu perfil:</LegendComponent>
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="user"
          label="Nome e sobrenome:"
          placeholderText="Nome e sobrenome"
          value={completeName}
          errorMessage={completeNameError}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleCompleteNameInputChange(text)
          }
        />
        <LegendComponent>Campos de acesso:</LegendComponent>
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          value={email}
          placeholderText="Email cadastrado"
          editable={false}
        />
        <LegendComponent>Alteração de senha:</LegendComponent>
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="lock"
          type="password"
          label="Senha atual:"
          placeholderText="Senha secreta"
          value={currentPassword}
          errorMessage={currentPasswordError}
          infoMessage="Necessário em caso de alteração de senha"
          onChangeText={(text) =>
            this.changeProfileViewModel.handleCurrentPasswordInputChange(text)
          }
        />
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="lock"
          type="password"
          label="Nova senha:"
          placeholderText="Senha secreta"
          value={newPassword}
          errorMessage={newPasswordError}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleNewPasswordInputChange(text)
          }
        />
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a sua nova senha:"
          placeholderText="Senha secreta"
          value={confirmNewPassword}
          errorMessage={confirmNewPasswordError}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleConfirmNewPasswordInputChange(
              text
            )
          }
        />
        <ButtonComponent
          type="outline"
          onPress={() => this.changeProfileViewModel.handleSubmit()}
          style={spacing.button}
        >
          Atualizar
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
