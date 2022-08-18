import React from 'react';
import { ButtonComponent, TextInputComponent } from '@/presentation/components';
import { PublicLayout } from '@/presentation/layouts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseView } from '../base-view';
import { spacing } from './styles';
import { CodeConfirmationViewModel } from '@/presentation/view-models';

export interface CodeConfirmationViewProps
  extends NativeStackScreenProps<StackParamList, 'CodeConfirmation'> {
  codeConfirmationViewModel: CodeConfirmationViewModel;
}

export interface CodeConfirmationViewState {
  form: {
    code: string;
  };
  formErrors: CodeConfirmationViewState['form'];
  isLoading: boolean;
}

export class CodeConfirmationView
  extends React.Component<CodeConfirmationViewProps, CodeConfirmationViewState>
  implements BaseView
{
  private codeConfirmationViewModel: CodeConfirmationViewModel;

  constructor(props: CodeConfirmationViewProps) {
    super(props);

    const { codeConfirmationViewModel } = this.props;
    this.codeConfirmationViewModel = codeConfirmationViewModel;

    this.state = {
      form: codeConfirmationViewModel.form,
      formErrors: codeConfirmationViewModel.formErrors,
      isLoading: codeConfirmationViewModel.isLoading,
    };
  }

  public componentDidMount(): void {
    this.codeConfirmationViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.codeConfirmationViewModel.detachView();
  }

  public onViewModelChanged() {
    this.setState({
      form: this.codeConfirmationViewModel.form,
      formErrors: this.codeConfirmationViewModel.formErrors,
      isLoading: this.codeConfirmationViewModel.isLoading,
    });
  }

  render() {
    const {
      form: { code },
      isLoading,
    } = this.state;
    const { code: codeError } = this.state.formErrors;
    return (
      <PublicLayout
        title="Informe o código recebido no email"
        isLoading={isLoading}
      >
        <TextInputComponent
          style={spacing.input}
          type="password"
          iconName="lock"
          label="Código recebido:"
          placeholderText="Código"
          value={code}
          errorMessage={codeError}
          onChangeText={(text) =>
            this.codeConfirmationViewModel.handleCodeInputChange(text)
          }
        />
        <ButtonComponent
          onPress={() => this.codeConfirmationViewModel.handleSubmit()}
          style={spacing.button}
        >
          Confirmar
        </ButtonComponent>
      </PublicLayout>
    );
  }
}
