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
import { getIcon, IconName } from '@/presentation/utils';
import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { useTheme } from 'styled-components';
import { UserPlantModel } from '@/domain/models';
import Plant1Image from '@assets/images/plant1.png';
import { useEffect, useState } from 'react';
import { NextCareLoadingComponent } from './next-care-loading-component';
import { EmptyContentComponent } from '@/presentation/components';
import { MyGardenCardType } from '@/presentation/@types/generics';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  plants: UserPlantModel[];
  onFinish?: (selectedPlant: UserPlantModel) => void;
  onEdit?: (selectedPlant: UserPlantModel) => void;
  loading: boolean;
}

type Item = { type: MyGardenCardType; key: string | number } & UserPlantModel;

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  plants,
  onFinish = () => null,
  onEdit = () => null,
  loading,
}) => {
  const theme = useTheme();
  const [list, setList] = useState<Item[]>([]);

  const params = {
    finish: -75,
    edit: 75,
  };

  const isSun = (type: MyGardenCardType) => type === 'sun';

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
      if (plant.sunRange) result.push({ ...plant, type: 'sun', key: i });

      if (plant.waterRange)
        result.push({ ...plant, type: 'water', key: i + 1 });

      if (!plant.waterRange && !plant.sunRange)
        result.push({ ...plant, type: 'incompleted', key: i + 1 });
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

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <SwipeRow
      disableLeftSwipe={item.type === 'incompleted'}
      stopLeftSwipe={params.edit}
      leftOpenValue={params.edit}
      stopRightSwipe={params.finish}
      rightOpenValue={params.finish}
      item={item}
    >
      {renderHiddenItem()}
      <ContainerContent
        key={item.id}
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
                source={getIcon(item.type as IconName)}
                width={11}
                height={12}
                resizeMode="center"
              />
              {item.type !== 'incompleted' ? (
                <ItemTitle type={item.type}>
                  {isSun(item.type) ? 'Expor ao sol' : 'Regar'}{' '}
                  {isSun(item.type) ? item.sunRange : item.waterRange}
                </ItemTitle>
              ) : (
                <ItemTitle type={item.type}>Nenhuma tarefa agendada</ItemTitle>
              )}
            </ContainerItemTitle>
            <ItemSubtitle type={item.type}>{item.name}</ItemSubtitle>
            <ItemDescription type={item.type}>
              {item.annotation}
            </ItemDescription>
          </ConteinerItemText>
          <ItemImage
            type={item.type}
            source={Plant1Image}
            resizeMode="center"
          />
        </ContainerItem>
      </ContainerContent>
    </SwipeRow>
  );

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
      {loading ? (
        <NextCareLoadingComponent />
      ) : !loading && !plants.length ? (
        <Container style={styles.empty}>
          <EmptyContentComponent description="Oops! Você ainda não cadastrou nenhuma planta :(" />
        </Container>
      ) : (
        <SwipeListView
          data={list}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.containerStyle}
          onRowDidOpen={handleOpenRow}
        />
      )}
    </Container>
  );
};
