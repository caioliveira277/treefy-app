import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { TermsUseViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIcon } from '@/presentation/utils';
import { SubTitle, Paragraph, spacing } from './styles';
import { ButtonComponent } from '@/presentation/components';
import { BaseView } from '../base-view';

export interface TermsUseViewProps
  extends NativeStackScreenProps<StackParamList, 'TermsUse'> {
  termsUseViewModel: TermsUseViewModel;
}

export class TermsUseView
  extends React.Component<TermsUseViewProps>
  implements BaseView<TermsUseViewProps>
{
  private termsUseViewModel: TermsUseViewModel;

  constructor(props: TermsUseViewProps) {
    super(props);

    const { termsUseViewModel } = this.props;
    this.termsUseViewModel = termsUseViewModel;
  }

  public componentDidMount(): void {
    this.termsUseViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.termsUseViewModel.detachView();
  }

  public onViewModelChanged(): void {}

  render() {
    return (
      <ProfileLayout title="Termos de uso" image={getIcon('document-check')}>
        <SubTitle>Introdução</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <SubTitle>Artigo 1</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <SubTitle>Artigo 2</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <SubTitle>Artigo 3</SubTitle>
        <Paragraph>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <ButtonComponent
          type="outline"
          style={spacing.button}
          onPress={() => this.termsUseViewModel.handleMoveBack()}
        >
          Voltar
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
