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
  codeValue: string;
}

export class CodeConfirmationView
  extends React.Component<CodeConfirmationViewProps, CodeConfirmationViewState>
  implements BaseView<CodeConfirmationViewProps>
{
  private codeConfirmationViewModel: CodeConfirmationViewModel;

  constructor(props: CodeConfirmationViewProps) {
    super(props);

    const { codeConfirmationViewModel } = this.props;
    this.codeConfirmationViewModel = codeConfirmationViewModel;

    this.state = {
      codeValue: codeConfirmationViewModel.codeValue,
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
      codeValue: this.codeConfirmationViewModel.codeValue,
    });
  }

  render() {
    const { codeValue } = this.state;
    return (
      <PublicLayout title="Informe o código recebido">
        <TextInputComponent
          style={spacing.input}
          iconName="lock"
          label="Código recebido:"
          placeholderText="Código"
          value={codeValue}
          onChangeText={(text) =>
            this.codeConfirmationViewModel.handleCodeInputChange(text)
          }
          type="password"
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
