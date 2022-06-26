import { useState } from 'react';
import {
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Container, ContainerWateringTitleIcon } from './styles';
import { ItemListComponent } from '../';
import { Icon, Title } from '@/presentation/views/my-garden/styles';
import { getIcon } from '@/presentation/utils';
import { SwipeListView } from 'react-native-swipe-list-view';
import Plant1Image from '@assets/images/plant1.png';

export interface WateringComponentProps {
  style?: StyleProp<ViewStyle>;
}

export interface WateringComponentListState {
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

export const WateringComponent: React.FC<WateringComponentProps> = ({
  style,
}) => {
  const [list] = useState<WateringComponentListState[]>(temporaryData);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<WateringComponentListState>) => (
    <ItemListComponent
      type="water"
      image={item.image}
      imageSize="36px"
      title={item.title}
      smallText={item.time}
      description={item.description}
    />
  );

  const renderHiddenItem = ({
    item,
  }: ListRenderItemInfo<WateringComponentListState>) => (
    <Container>
      <Title>I am {item.title} in a SwipeListVidsaew</Title>
    </Container>
  );

  return (
    <Container style={style}>
      <ContainerWateringTitleIcon>
        <Title>Próximos cuidados:</Title>
        <Icon source={getIcon('water-drop')} resizeMode="center" />
      </ContainerWateringTitleIcon>
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
      />
    </Container>
  );
};
