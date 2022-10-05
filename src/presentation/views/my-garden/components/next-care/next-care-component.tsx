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
  styles,
} from './styles';
import { getIcon } from '@/presentation/utils';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';
import { useTheme } from 'styled-components';
import { UserPlantModel } from '@/domain/models';
import Plant1Image from '@assets/images/plant1.png';
import { useEffect, useState } from 'react';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  plants: UserPlantModel[];
  onFinish?: (selectedPlant: UserPlantModel) => void;
  onEdit?: (selectedPlant: UserPlantModel) => void;
}

type Item = { type: 'sun' | 'water'; key: string | number } & UserPlantModel;

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  plants,
  onFinish = () => null,
  onEdit = () => null,
}) => {
  const theme = useTheme();
  const [list, setList] = useState<Item[]>([]);

  const params = {
    finish: -75,
    edit: 75,
  };

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

  const getFormatedList = (plantList: UserPlantModel[]): Item[] => {
    const result: Item[] = [];

    plantList.forEach((plant, i) => {
      result.push({ ...plant, type: 'sun', key: String(plant.id) });
      result.push({ ...plant, type: 'water', key: `${plant.id}-${i}` });
    });

    return result;
  };

  const handleOpenRow = (
    rowKey: string,
    rowMap: RowMap<Item>,
    toValue: number
  ) => {
    if (!rowMap[rowKey]) return;

    rowMap[rowKey].closeRow();
    const item = rowMap[rowKey].props.item;

    if (params.finish === toValue) {
      onFinish(item as UserPlantModel);
    } else {
      onEdit(item as UserPlantModel);
    }
  };

  useEffect(() => {
    setList(getFormatedList(plants));
  }, [plants]);

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
        stopLeftSwipe={params.edit}
        leftOpenValue={params.edit}
        stopRightSwipe={params.finish}
        rightOpenValue={params.finish}
        onRowDidOpen={handleOpenRow}
        contentContainerStyle={styles.containerStyle}
      />
    </Container>
  );
};
