import { StyleProp, View, ViewStyle } from 'react-native';
import { Container, Title, Description, TextBold, styles } from './styles';
import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { UserPlantModel } from '@/domain/models';
import React, { useEffect, useState } from 'react';
import { NextCareLoadingComponent } from './next-care-loading-component';
import {
  EmptyContentComponent,
  LoadingOverlayComponent,
} from '@/presentation/components';
import { ItemComponent } from './item-component';
import {
  ModalState,
  MyGardenCardType,
  MyGardenItem,
} from '@/presentation/@types/generics';
import { HiddenItemComponent } from './hidden-item-component';
import { BackdropDeleteConfirmComponent } from './backdrop-delete-confirm';
import * as Notifications from 'expo-notifications';
import { shortDistanceToComplete } from '@/presentation/utils';

export interface NextCareComponentProps {
  style?: StyleProp<ViewStyle>;
  plants: UserPlantModel[];
  loading: boolean;
  onFinish?: (selectedPlant: MyGardenItem) => void;
  onEdit?: (selectedPlant: UserPlantModel) => void;
  onDelete?: (selectedPlant: UserPlantModel) => void;
  onLoadMoreData: (page: number) => void;
}

export const NextCareComponent: React.FC<NextCareComponentProps> = ({
  style,
  plants,
  loading,
  onFinish = () => null,
  onEdit = () => null,
  onDelete = () => null,
  onLoadMoreData,
}) => {
  const [list, setList] = useState<MyGardenItem[]>([]);
  const [confirmDeleteItem, setConfirmDeleteItem] =
    useState<null | MyGardenItem>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(ModalState.close);
  const [currentPage, setCurrentPage] = useState(1);

  const movement = {
    right: -75,
    left: 75,
  };

  const createItem = (
    plant: UserPlantModel,
    type: MyGardenCardType,
    started: boolean
  ) => ({
    ...plant,
    type,
    key: '',
    started,
  });

  const getFormatedList = (plantList: UserPlantModel[]): MyGardenItem[] => {
    const result: MyGardenItem[] = [];

    plantList.forEach((plant) => {
      if (plant.sunRange)
        result.push(createItem(plant, 'sun', !!plant.lastSunExposure));

      if (plant.waterRange)
        result.push(createItem(plant, 'water', !!plant.lastWatering));

      if (!plant.waterRange && !plant.sunRange)
        result.push(createItem(plant, 'incompleted', false));
    });

    return result.sort((a, b) => shortDistanceToComplete([a, b]));
  };

  const handleOpenRow = (
    rowKey: string,
    rowMap: RowMap<MyGardenItem>,
    toValue: number
  ) => {
    if (!rowMap[rowKey]) return;

    rowMap[rowKey].closeRow();
    const item = rowMap[rowKey].props.item;

    if (movement.right === toValue) {
      onFinish(item as MyGardenItem);
    } else {
      onEdit(item as UserPlantModel);
    }
  };

  const handleDeleteItem = (item: MyGardenItem) => {
    setConfirmDeleteItem(item);
    setOpenConfirmDelete(ModalState.open);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteItem(null);
    setOpenConfirmDelete(ModalState.close);
  };

  useEffect(() => {
    Notifications.cancelAllScheduledNotificationsAsync().finally(() => {
      setList(getFormatedList(plants));
    });
  }, [plants]);

  return (
    <>
      <Container style={style}>
        <Title>Próximos cuidados:</Title>
        <Description>
          Arraste para o lado <TextBold>direito</TextBold> para{' '}
          <TextBold>concluir</TextBold> e para o lado{' '}
          <TextBold>esquerdo</TextBold> para <TextBold>editar</TextBold>. {'\n'}
          Caso queira <TextBold>excluir</TextBold>, pressione e segure o item
          desejado.
        </Description>
        {loading && !plants.length ? (
          <NextCareLoadingComponent />
        ) : !loading && !plants.length ? (
          <Container style={styles.empty}>
            <EmptyContentComponent description="Oops! Você ainda não cadastrou nenhuma planta :(" />
          </Container>
        ) : (
          <View style={{ flex: 1 }}>
            {loading ? <LoadingOverlayComponent adjustYPosition={100} /> : null}
            <SwipeListView
              useFlatList={true}
              data={list}
              initialNumToRender={8}
              onEndReached={() => {
                const page = currentPage + 1;
                setCurrentPage(page);
                onLoadMoreData(page);
              }}
              onEndReachedThreshold={0.1}
              renderItem={(props) => (
                <SwipeRow
                  disableLeftSwipe={props.item.type === 'incompleted'}
                  stopLeftSwipe={movement.left}
                  leftOpenValue={movement.left}
                  stopRightSwipe={movement.right}
                  rightOpenValue={movement.right}
                  item={props.item}
                  swipeToOpenPercent={90}
                >
                  <HiddenItemComponent {...props} />
                  <ItemComponent
                    {...props}
                    onLongPress={() => handleDeleteItem(props.item)}
                  />
                </SwipeRow>
              )}
              extraData={plants}
              keyExtractor={(_, i) => i.toString()}
              contentContainerStyle={{ paddingBottom: 30 }}
              onRowDidOpen={handleOpenRow}
            />
          </View>
        )}
      </Container>
      <BackdropDeleteConfirmComponent
        modalState={openConfirmDelete}
        item={confirmDeleteItem}
        onClose={handleCloseConfirmDelete}
        onConfirm={(item) => {
          onDelete(item);
          handleCloseConfirmDelete();
        }}
      />
    </>
  );
};
