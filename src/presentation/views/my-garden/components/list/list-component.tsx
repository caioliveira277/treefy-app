import { useState } from 'react';
import {
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Container, ContainerHiddenItem } from './styles';
import { ItemListComponent, TypeItem } from '../';
import {
  Icon,
  Title,
  ContainerTitleIcon,
} from '@/presentation/views/my-garden/styles';
import { getIcon, IconName } from '@/presentation/utils';
import { SwipeListView } from 'react-native-swipe-list-view';

type Data = {
  key: number;
  image: ImageSourcePropType;
  title: string;
  time: string;
  description: string;
};
export interface ListComponentProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  typeItem: TypeItem;
  iconName: IconName;
  data: Data[];
}

export const ListComponent: React.FC<ListComponentProps> = ({
  style,
  title,
  iconName,
  typeItem,
  data,
}) => {
  const [list] = useState<Data[]>(data);

  const renderItem = ({ item }: ListRenderItemInfo<Data>) => (
    <ItemListComponent
      type={typeItem}
      image={item.image}
      title={item.title}
      smallText={item.time}
    >
      {item.description}
    </ItemListComponent>
  );

  const renderHiddenItem = ({}: ListRenderItemInfo<Data>) => (
    <ContainerHiddenItem>
      <Icon source={getIcon('edit')} resizeMode="center" />
      <Icon source={getIcon('check-circle')} resizeMode="center" />
    </ContainerHiddenItem>
  );

  return (
    <Container style={style}>
      <ContainerTitleIcon>
        <Title>{title}:</Title>
        <Icon source={getIcon(iconName)} resizeMode="center" />
      </ContainerTitleIcon>
      <SwipeListView
        style={{ height: 240 }}
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        stopLeftSwipe={80}
        stopRightSwipe={-80}
      />
    </Container>
  );
};
