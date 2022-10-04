import { StyleProp, ViewStyle, ListRenderItemInfo } from 'react-native';
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
import { UserPlantModel } from '@/domain/models';
import Plant1Image from '@assets/images/plant1.png';
import { useEffect, useState } from 'react';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  userPlants: UserPlantModel[];
}

type Item = { type: 'sun' | 'water'; key: string | number } & UserPlantModel;

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  userPlants,
}) => {
  const theme = useTheme();
  const [list, setList] = useState<Item[]>([]);

  const isSun = (type: 'sun' | 'water') => type === 'sun';

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <ContainerContent
      style={{
        ...theme.shadows.sm,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
      }}
    >
      <ContainerItem type={item.type}>
        <ConteinerItemText>
          <ContainerItemTitle>
            <Icon
              source={isSun(item.type) ? getIcon('sun') : getIcon('water-drop')}
              width={11}
              height={11}
              resizeMode="center"
            />
            <ItemTitle>
              {isSun(item.type) ? 'Expor ao sol' : 'Regar'}{' '}
              {isSun(item.type) ? item.sunRange : item.waterRange}
            </ItemTitle>
          </ContainerItemTitle>
          <ItemSubtitle>{item.name}</ItemSubtitle>
          <ItemDescription>{item.annotation}</ItemDescription>
        </ConteinerItemText>
        <ItemImage source={Plant1Image} resizeMode="center" />
      </ContainerItem>
    </ContainerContent>
  );

  const renderHiddenItem = () => (
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

  const getFormatedList = (plants: UserPlantModel[]): Item[] => {
    const result: Item[] = [];

    plants.forEach((plant, i) => {
      result.push({ ...plant, type: 'sun', key: String(plant.id) });
      result.push({ ...plant, type: 'water', key: `${plant.id}-${i}` });
    });

    return result;
  };

  useEffect(() => {
    setList(getFormatedList(userPlants));
  }, [userPlants]);

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
