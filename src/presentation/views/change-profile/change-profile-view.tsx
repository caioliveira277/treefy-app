import React from 'react';
import {
  ButtonComponent,
  TextInputComponent,
  LegendComponent,
} from '@/presentation/components';
import { ProfileLayout } from '@/presentation/layouts';
import { ChangeProfileViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { spacing, EditProfileImageButton, EditIcon } from './styles';
import { BaseView } from '../base-view';
// TODO: remove image after implementation
import temporaryImageProfile from '@assets/images/profile.png';
import { currentTheme } from '@/presentation/themes';
import { getIcon } from '@/presentation/utils';

export interface ChangeProfileViewProps
  extends NativeStackScreenProps<StackParamList, 'ChangeProfile'> {
  changeProfileViewModel: ChangeProfileViewModel;
}

export interface ChangeProfileViewState {
  completeNameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
}

export class ChangeProfileView
  extends React.Component<ChangeProfileViewProps, ChangeProfileViewState>
  implements BaseView<ChangeProfileViewProps>
{
  private changeProfileViewModel: ChangeProfileViewModel;

  constructor(props: ChangeProfileViewProps) {
    super(props);

    const { changeProfileViewModel } = props;
    this.changeProfileViewModel = changeProfileViewModel;

    this.state = {
      completeNameValue: changeProfileViewModel.completeNameValue,
      emailValue: changeProfileViewModel.emailValue,
      passwordValue: changeProfileViewModel.passwordValue,
      confirmPasswordValue: changeProfileViewModel.confirmPasswordValue,
    };
  }

  public componentDidMount(): void {
    this.changeProfileViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.changeProfileViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      completeNameValue: this.changeProfileViewModel.completeNameValue,
      emailValue: this.changeProfileViewModel.emailValue,
      passwordValue: this.changeProfileViewModel.passwordValue,
      confirmPasswordValue: this.changeProfileViewModel.confirmPasswordValue,
    });
  }

  render() {
    const {
      completeNameValue,
      emailValue,
      passwordValue,
      confirmPasswordValue,
    } = this.state;
    const theme = currentTheme;
    return (
      <ProfileLayout
        title="Alterar informações"
        image={temporaryImageProfile}
        slotHeader={
          <EditProfileImageButton style={{ ...theme.shadows.sm }}>
            <EditIcon source={getIcon('edit')} resizeMode="center" />
          </EditProfileImageButton>
        }
        imageRounded
      >
        <LegendComponent>Seu perfil:</LegendComponent>
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="user"
          label="Nome e sobrenome:"
          placeholderText="Nome e sobrenome"
          value={completeNameValue}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleCompleteNameInputChange(text)
          }
        />
        <LegendComponent>Campos de acesso:</LegendComponent>
        <TextInputComponent
          style={spacing.input}
          iconName="mail"
          label="Email cadastrado:"
          placeholderText="Email cadastrado"
          value={emailValue}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleEmailInputChange(text)
          }
        />
        <TextInputComponent
          style={spacing.inputGroup}
          iconName="lock"
          type="password"
          label="Senha:"
          placeholderText="Senha secreta"
          value={passwordValue}
          onChangeText={(text) =>
            this.changeProfileViewModel.handlePasswordInputChange(text)
          }
        />
        <LegendComponent>Confirmação:</LegendComponent>
        <TextInputComponent
          iconName="lock"
          type="password"
          label="Confirme a senha:"
          placeholderText="Senha secreta"
          value={confirmPasswordValue}
          onChangeText={(text) =>
            this.changeProfileViewModel.handleConfirmPasswordInputChange(text)
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
