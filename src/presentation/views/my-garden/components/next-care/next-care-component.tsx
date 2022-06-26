import { StyleProp, ViewStyle } from 'react-native';
import { Container, Content, TitleNextCare } from './styles';
import { ItemListComponent } from '../';
import { DescriptionBold } from '@/presentation/views/my-garden/styles';
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
        <ItemListComponent
          type="water"
          image={getIcon('water-drop')}
          title="Planta 1"
          imageSize="18px"
          borderDashed={false}
        >
          Regagem <DescriptionBold>hoje</DescriptionBold> ás{' '}
          <DescriptionBold>18:23h</DescriptionBold>
        </ItemListComponent>
        <ItemListComponent
          type="sun"
          image={getIcon('sun')}
          title="Planta 1"
          imageSize="18px"
          borderDashed={false}
        >
          Regagem <DescriptionBold>hoje</DescriptionBold> ás{' '}
          <DescriptionBold>18:23h</DescriptionBold>
        </ItemListComponent>
      </Content>
    </Container>
  );
};
