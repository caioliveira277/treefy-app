import { useState } from 'react';
import {
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ListRenderItemInfo,
} from 'react-native';
import {
  Container,
  Title,
  Description,
  TextBold,
  ContainerHiddenItem,
  Icon,
  ContainerItem,
  ItemImage,
  ConteinerItemText,
  ItemTitle,
  ItemDescription,
  ContainerItemTitle,
  ItemSubtitle,
  ContainerContent,
  ContainerHiddenContent,
} from './styles';
import { getIcon } from '@/presentation/utils';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from 'styled-components';

export type TypeItem = 'water' | 'sun';

export type ItemData = {
  key: number;
  image: ImageSourcePropType;
  title: string;
  time: string;
  description: string;
  type: TypeItem;
};
export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  data: ItemData[];
}

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  data,
}) => {
  const theme = useTheme();
  const [list] = useState<ItemData[]>(data);

  const renderItem = ({ item }: ListRenderItemInfo<ItemData>) => (
    <ContainerContent
      style={{
        ...theme.shadows.sm,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}
    >
      <ContainerItem type={item.type}>
        <ConteinerItemText>
          <ContainerItemTitle>
            <Icon
              source={
                item.type === 'sun' ? getIcon('sun') : getIcon('water-drop')
              }
              width={11}
              height={11}
              resizeMode="center"
            />
            <ItemTitle>
              {item.type === 'sun' ? 'Expor ao sol' : 'Regar'} {item.time}
            </ItemTitle>
          </ContainerItemTitle>
          <ItemSubtitle>{item.title}</ItemSubtitle>
          <ItemDescription>{item.description}</ItemDescription>
        </ConteinerItemText>
        <ItemImage source={item.image} resizeMode="center" />
      </ContainerItem>
    </ContainerContent>
  );

  const renderHiddenItem = ({}: ListRenderItemInfo<ItemData>) => (
    <ContainerHiddenItem>
      <ContainerHiddenContent type="edit">
        <Icon
          width={18}
          height={18}
          source={getIcon('edit-white')}
          resizeMode="center"
        />
      </ContainerHiddenContent>
      <ContainerHiddenContent type="complete">
        <Icon
          width={22}
          height={22}
          source={getIcon('check-circle')}
          resizeMode="center"
        />
      </ContainerHiddenContent>
    </ContainerHiddenItem>
  );
  return (
    <Container style={style}>
      <Title>Próximos cuidados:</Title>
      <Description>
        Arraste para o lado <TextBold>esquerdo</TextBold> para{' '}
        <TextBold>concluir</TextBold> e para o lado <TextBold>direto</TextBold>{' '}
        para <TextBold>editar</TextBold>
      </Description>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        stopLeftSwipe={75}
        stopRightSwipe={-75}
        contentContainerStyle={{
          paddingBottom: 190,
        }}
      />
    </Container>
  );
};
