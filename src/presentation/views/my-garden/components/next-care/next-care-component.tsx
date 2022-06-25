import { StyleProp, ViewStyle } from 'react-native';
import {
  Container,
  Content,
  ContainerItem,
  ItemTitle,
  ItemDescription,
  ItemDescriptionBold,
  ConteinerText,
  TitleNextCare,
} from './styles';
import { Icon } from '@/presentation/views/my-garden/styles';
import { getIcon } from '@/presentation/utils';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
}

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
}) => {
  return (
    <Container style={style}>
      <TitleNextCare>Próximos cuidados:</TitleNextCare>
      <Content>
        <ContainerItem type="water">
          <Icon source={getIcon('water-drop')} resizeMode="center" />
          <ConteinerText>
            <ItemTitle>Planta 1</ItemTitle>
            <ItemDescription>
              Regagem <ItemDescriptionBold>hoje</ItemDescriptionBold> ás{' '}
              <ItemDescriptionBold>18:23h</ItemDescriptionBold>
            </ItemDescription>
          </ConteinerText>
        </ContainerItem>
        <ContainerItem type="sun">
          <Icon source={getIcon('sun')} resizeMode="center" />
          <ConteinerText>
            <ItemTitle>Planta 1</ItemTitle>
            <ItemDescription>
              Retirar do sol <ItemDescriptionBold>hoje</ItemDescriptionBold> ás{' '}
              <ItemDescriptionBold>18:23h</ItemDescriptionBold>
            </ItemDescription>
          </ConteinerText>
        </ContainerItem>
      </Content>
    </Container>
  );
};
