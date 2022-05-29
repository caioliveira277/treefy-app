import React from 'react';
import { ProfileLayout } from '@/presentation/layouts';
import { HelpViewModel } from '@/presentation/view-models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIcon } from '@/presentation/utils';
import {
  SubTitle,
  Paragraph,
  ContainerComunicationChannel,
  ContainerTextIcon,
  Icon,
  Label,
  SmallText,
  Link,
  spacing,
} from './styles';
import { ButtonComponent } from '@/presentation/components';

export interface HelpViewProps
  extends NativeStackScreenProps<StackParamList, 'Help'> {
  helpViewModel: HelpViewModel;
}

export class HelpView extends React.Component<HelpViewProps> {
  private helpViewModel: HelpViewModel;

  constructor(props: HelpViewProps) {
    super(props);

    const { helpViewModel } = this.props;
    this.helpViewModel = helpViewModel;
  }

  render() {
    return (
      <ProfileLayout title="Ajuda" image={getIcon('headset')}>
        <SubTitle style={spacing.subTitle}>Fale conosco:</SubTitle>
        <Paragraph style={spacing.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Paragraph>
        <SubTitle style={spacing.subTitle}>Canais de comunicação:</SubTitle>
        <ContainerComunicationChannel>
          <ContainerTextIcon>
            <Icon source={getIcon('mail')} resizeMode="center" />
            <Label>Email:</Label>
          </ContainerTextIcon>
          <Link>
            <SmallText>contato@treefy.com.br</SmallText>
          </Link>
          <Link>
            <SmallText>sugestoes@treefy.com.br</SmallText>
          </Link>
        </ContainerComunicationChannel>
        <ContainerComunicationChannel>
          <ContainerTextIcon>
            <Icon source={getIcon('tel')} resizeMode="center" />
            <Label>Telefone:</Label>
          </ContainerTextIcon>
          <Link>
            <SmallText>(39) 9 8781-8187</SmallText>
          </Link>
          <Link>
            <SmallText>(39) 3030-3030</SmallText>
          </Link>
        </ContainerComunicationChannel>
        <ButtonComponent
          type="outline"
          style={spacing.button}
          onPress={() => this.helpViewModel.handleMoveBack()}
        >
          Voltar
        </ButtonComponent>
      </ProfileLayout>
    );
  }
}
