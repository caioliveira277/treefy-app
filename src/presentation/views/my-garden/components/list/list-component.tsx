import { useState } from 'react';
import {
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Container, ContainerTitleIcon, ContainerHiddenItem } from './styles';
import { ItemListComponent, TypeItem } from '../';
import { Icon, Title } from '@/presentation/views/my-garden/styles';
import { getIcon, IconName } from '@/presentation/utils';
import { SwipeListView } from 'react-native-swipe-list-view';
import Plant1Image from '@assets/images/plant1.png';

export interface ListComponentProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  typeItem: TypeItem;
  iconName: IconName;
}

export interface ListComponentListState {
  image: ImageSourcePropType;
  title: string;
  time: string;
  description: string;
}

// TODO: remove after implementation
const temporaryData = [
  {
    key: 1,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 2,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
  {
    key: 3,
    image: Plant1Image,
    title: 'Planta 1',
    time: 'hoje ás 12:43h',
    description: 'Lorem Ipsum is simply dummy ext of the...',
  },
];

export const ListComponent: React.FC<ListComponentProps> = ({
  style,
  title,
  iconName,
  typeItem,
}) => {
  const [list] = useState<ListComponentListState[]>(temporaryData);

  const renderItem = ({ item }: ListRenderItemInfo<ListComponentListState>) => (
    <ItemListComponent
      type={typeItem}
      image={item.image}
      title={item.title}
      smallText={item.time}
    >
      {item.description}
    </ItemListComponent>
  );

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<ListComponentListState>) => (
    <ContainerHiddenItem>
      <Title>I am {item.title} in a SwipeListVidsaew</Title>
    </ContainerHiddenItem>
  );

  return (
    <Container style={style}>
      <ContainerTitleIcon>
        <Title>{title}:</Title>
        <Icon source={getIcon(iconName)} resizeMode="center" />
      </ContainerTitleIcon>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
      />
    </Container>
  );
};
